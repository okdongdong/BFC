package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.request.*;
import com.busanfullcourse.bfc.api.response.MyInfoRes;
import com.busanfullcourse.bfc.api.response.TokenRes;
import com.busanfullcourse.bfc.api.response.UserProfileRes;
import com.busanfullcourse.bfc.common.cache.CacheKey;
import com.busanfullcourse.bfc.common.jwt.LogoutAccessToken;
import com.busanfullcourse.bfc.common.jwt.RefreshToken;
import com.busanfullcourse.bfc.common.util.JwtTokenUtil;
import com.busanfullcourse.bfc.db.repository.LogoutAccessTokenRedisRepository;
import com.busanfullcourse.bfc.db.repository.RefreshTokenRedisRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.busanfullcourse.bfc.common.jwt.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;
import static com.busanfullcourse.bfc.common.jwt.JwtExpirationEnums.REISSUE_EXPIRATION_TIME;



@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public void signup(SignUpReq signUpReq) {
        if (!signUpReq.getPassword().equals(signUpReq.getPasswordCheck())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        signUpReq.setPassword(passwordEncoder.encode(signUpReq.getPassword()));
        userRepository.save(User.ofUser(signUpReq));
    }

    public void signupAdmin(SignUpReq signUpReq) {
        if (!signUpReq.getPassword().equals(signUpReq.getPasswordCheck())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        signUpReq.setPassword(passwordEncoder.encode(signUpReq.getPassword()));
        userRepository.save(User.ofAdmin(signUpReq));
    }

    public TokenRes login(LoginReq loginReq) {
        User user = userRepository.findByUsername(loginReq.getUsername()).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        checkPassword(loginReq.getPassword(), user.getPassword());

        String username = user.getUsername();
        String accessToken = jwtTokenUtil.generateAccessToken(username);
        RefreshToken refreshToken = saveRefreshToken(username);
        return TokenRes.of(accessToken, refreshToken.getRefreshToken());
    }

    private void checkPassword(String rawPassword, String findMemberPassword) {
        if (!passwordEncoder.matches(rawPassword, findMemberPassword)) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }
    }

    private RefreshToken saveRefreshToken(String username) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(username,
                jwtTokenUtil.generateRefreshToken(username), REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    public UserProfileRes getUserProfile(String nickname) {
        User user = userRepository.findByNickname(nickname).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        if (!user.getUsername().equals(getCurrentUsername())) {
            throw new IllegalArgumentException("회원 정보가 일치하지 않습니다.");
        }
        return UserProfileRes.builder()
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profileImg(convertByteArrayToString(user.getProfileImg()))
                .build();
    }

    public MyInfoRes getMyInfo(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return MyInfoRes.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .birthday(user.getBirthday())
                .profileImg(convertByteArrayToString(user.getProfileImg()))
                .build();
    }

    public MyInfoRes getMyInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return MyInfoRes.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .birthday(user.getBirthday())
                .profileImg(convertByteArrayToString(user.getProfileImg()))
                .build();
    }

    public void updateMyInfo(UserUpdateReq userUpdateReq, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        user.setBirthday(userUpdateReq.getBirthday());
        user.setGender(userUpdateReq.getGender());
        user.setNickname(userUpdateReq.getNickname());
        userRepository.save(user);
    }

    public void changePassword(ChangePasswordReq changePasswordReq, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        checkPassword(changePasswordReq.getOldPassword(), user.getPassword());
        if (!changePasswordReq.getNewPassword().equals(changePasswordReq.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(changePasswordReq.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteUser(UserDeleteReq userDeleteReq, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        checkPassword(userDeleteReq.getPassword(), user.getPassword());
        userRepository.deleteById(userId);
    }

    // Redis에 저장된 refreshToken을 삭제하고, accessToken을 Key로 하여 남은 기간 만큼 TTL을 설정 후 LogoutAccessToken을 저장
    @CacheEvict(value = CacheKey.USER, key = "#username")
    public void logout(TokenRes tokenRes, String username) {

        String accessToken = resolveToken(tokenRes.getAccessToken());
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(accessToken);
        refreshTokenRedisRepository.deleteById(username);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.createLogoutAccessToken(accessToken, username, remainMilliSeconds));
    }

    private String resolveToken(String token) {
        return token.substring(7);
    }

    // 토큰이 만료되면 토큰 재발급
    // 사용자 이름 조회 -> 사용자 이름으로 redis에서 refreshToken 조회 -> 사용자가 보낸 토큰과 redis의 토큰 비교 -> 일치하면 재발급
    public TokenRes reissue(String refreshToken) {
        refreshToken = resolveToken(refreshToken);

        String username = getCurrentUsername();
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            return reissueRefreshToken(refreshToken, username);
        }
        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
    }

    private String getCurrentUsername() {
        // JwtAuthenticationFilter를 통해 SecurityContext 에 저장된 Authentication 객체를 조회
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    private TokenRes reissueRefreshToken(String refreshToken, String username) {
        // 토큰이 만료되었으면
        if (lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            // accessToken, refreshToken 재생성
            return TokenRes.of(accessToken, saveRefreshToken(username).getRefreshToken());
        }
        // accessToken만 재생성
        return TokenRes.of(jwtTokenUtil.generateAccessToken(username), refreshToken);
    }

    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < REISSUE_EXPIRATION_TIME.getValue();
    }

    public Boolean checkNickname(String nickname) {
        // 비어있으면 true, 객체가 찾아지면 false.
        return userRepository.findByNickname(nickname).isEmpty();
    }

    public UserProfileRes updateProfileImg(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        Byte[] bytes = new Byte[file.getBytes().length];
        byte[] fileToBytes = file.getBytes();

        int i = 0;

        for (byte b : file.getBytes()) {
            bytes[i++] = b;
        }
        user.setProfileImg(bytes);
        userRepository.save(user);


        return UserProfileRes.builder()
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profileImg(convertByteArrayToString(user.getProfileImg()))
                .build();
    }

    private String convertByteArrayToString(Byte[] bytes) {
        byte [] primitiveBytes = new byte[bytes.length];
        int j = 0;
        for (Byte b: bytes) {
            primitiveBytes[j++] = b;
        }
        return new String(primitiveBytes);
    }

}

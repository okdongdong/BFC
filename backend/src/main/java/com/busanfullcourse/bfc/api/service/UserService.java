package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.request.*;
import com.busanfullcourse.bfc.api.response.*;
import com.busanfullcourse.bfc.common.cache.CacheKey;
import com.busanfullcourse.bfc.common.jwt.LogoutAccessToken;
import com.busanfullcourse.bfc.common.jwt.RefreshToken;
import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.common.util.JwtTokenUtil;
import com.busanfullcourse.bfc.db.entity.*;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.busanfullcourse.bfc.common.jwt.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;
import static com.busanfullcourse.bfc.common.jwt.JwtExpirationEnums.REISSUE_EXPIRATION_TIME;



@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final InterestRepository interestRepository;
    private final LikeRepository likeRepository;
    private final PasswordEncoder passwordEncoder;
    private final ScheduleRepository scheduleRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ConvertUtil convertUtil;
    private final FullCourseRepository fullCourseRepository;

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
        String reqUsername = getCurrentUsername();
        User reqUser = userRepository.findByUsername(reqUsername).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        Optional<Follow> follow = followRepository.findByFromUserAndToUser(reqUser, user);
        Boolean isFollowing;
        isFollowing = follow.isPresent();
        List<Interest> interestList = interestRepository.findTop4ByUserIdOrderByInterestIdDesc(user.getId());
        List<FullCourse> fullCourseList = fullCourseRepository.findTop6ByUserOrderByStartedOn(user);
        List<FullCourseListRes> myFullCourseListRes = fullCourseList.stream().map(fullCourse -> FullCourseListRes.builder()
                .fullCourseId(fullCourse.getFullCourseId())
                .likeCnt(fullCourse.getLikeCnt())
                .title(fullCourse.getTitle())
                .startedOn(fullCourse.getStartedOn())
                .finishedOn(fullCourse.getFinishedOn())
                .thumbnailList(FullCourseListRes.ofThumbnailList(
                        scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(
                                fullCourse.getFullCourseId())))
                .build()).collect(Collectors.toList());

        List<Like> likeList = likeRepository.findTop6ByUser(user);
        List<FullCourseListRes> fullCourseListRes = likeList.stream().map(like -> FullCourseListRes.builder()
                .fullCourseId(like.getFullCourse().getFullCourseId())
                .likeCnt(like.getFullCourse().getLikeCnt())
                .title(like.getFullCourse().getTitle())
                .startedOn(like.getFullCourse().getStartedOn())
                .finishedOn(like.getFullCourse().getFinishedOn())
                .thumbnailList(FullCourseListRes.ofThumbnailList(
                        scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(
                                like.getFullCourse().getFullCourseId())))
                .build()).collect(Collectors.toList());

        return UserProfileRes.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .followerCnt(user.getFollowers().size())
                .followingCnt(user.getFollowings().size())
                .isFollowing(isFollowing)
                .profileImg(convertUtil.convertByteArrayToString(user.getProfileImg()))
                .interestList(InterestListRes.of(interestList))
                .myList(myFullCourseListRes)
                .likeList(fullCourseListRes)
                .build();
    }
    // 로그인에 사용됨
    public MyInfoRes getMyInfo(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return MyInfoRes.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .birthday(user.getBirthday())
                .profileImg(convertUtil.convertByteArrayToString(user.getProfileImg()))
                .build();
    }
    // 회원 정보 조회에 사용됨
    public MyInfoRes getMyInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        String reqUsername = getCurrentUsername();
        if (!user.getUsername().equals(reqUsername)) {
            throw new IllegalArgumentException("본인이 아닙니다.");
        }
        return MyInfoRes.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .birthday(user.getBirthday())
                .profileImg(convertUtil.convertByteArrayToString(user.getProfileImg()))
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

    public String getCurrentUsername() {
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

    public UserProfileRes updateProfileImg(Long userId, MultipartFile file) throws IOException, IllegalAccessException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        String username = getCurrentUsername();
        if (!username.equals(user.getUsername())) {
            throw new IllegalAccessException("본인이 아닙니다.");
        }
        byte[] bytesArray = file.getBytes();

        Byte[] bytes = new Byte[bytesArray.length];

        int i = 0;
        for (byte b : bytesArray) {
            bytes[i++] = b;
        }
        user.setProfileImg(bytes);
        userRepository.save(user);

        return UserProfileRes.builder()
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profileImg(convertUtil.convertByteArrayToString(user.getProfileImg()))
                .build();
    }


    public FollowRes follow(Long yourId) {
        String myName = getCurrentUsername();
        User you = userRepository.findById(yourId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        if (you.getUsername().equals(myName)) {
            throw new IllegalArgumentException("자기자신은 팔로우 할 수 없습니다.");
        }
        User me = userRepository.findByUsername(myName).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        Optional<Follow> follow = followRepository.findByFromUserAndToUser(me, you);
        Boolean isFollowing;

        if (follow.isPresent()){
            isFollowing = false;
            followRepository.deleteById(follow.get().getFollowId());
            you.getFollowers().remove(follow.get());

        } else {
            isFollowing = true;
            followRepository.save(Follow.builder()
                    .fromUser(me)
                    .toUser(you)
                    .build());
        }

        return FollowRes.builder()
                .followerCnt(you.getFollowers().size())
                .followingCnt(you.getFollowings().size())
                .isFollowing(isFollowing)
                .build();
    }

}

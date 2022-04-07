package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.request.*;
import com.busanfullcourse.bfc.api.response.*;
import com.busanfullcourse.bfc.common.cache.CacheKey;
import com.busanfullcourse.bfc.common.jwt.LogoutAccessToken;
import com.busanfullcourse.bfc.common.jwt.RefreshToken;
import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.common.util.JwtTokenUtil;
import com.busanfullcourse.bfc.db.entity.*;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
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

    public Map<String,Long> signup(SignUpReq signUpReq) {
        if (!signUpReq.getPassword().equals(signUpReq.getPasswordCheck())){
            throw new IllegalArgumentException(ExceptionUtil.USER_PW_INVALID);
        }
        signUpReq.setPassword(passwordEncoder.encode(signUpReq.getPassword()));
        User user = userRepository.save(User.ofUser(signUpReq));
        Map<String, Long> map = new HashMap<>();
        map.put("userId", user.getId());
        return map;
    }

    public void signupAdmin(SignUpReq signUpReq) {
        if (!signUpReq.getPassword().equals(signUpReq.getPasswordCheck())){
            throw new IllegalArgumentException(ExceptionUtil.USER_PW_INVALID);
        }
        signUpReq.setPassword(passwordEncoder.encode(signUpReq.getPassword()));
        userRepository.save(User.ofAdmin(signUpReq));
    }

    public TokenRes login(LoginReq loginReq) {
        User user = userRepository.findByUsername(loginReq.getUsername())
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        checkPassword(loginReq.getPassword(), user.getPassword());

        String username = user.getUsername();
        String accessToken = jwtTokenUtil.generateAccessToken(username);
        RefreshToken refreshToken = saveRefreshToken(username);
        return TokenRes.of(accessToken, refreshToken.getToken());
    }

    private void checkPassword(String rawPassword, String findMemberPassword) {
        if (!passwordEncoder.matches(rawPassword, findMemberPassword)) {
            throw new IllegalArgumentException(ExceptionUtil.USER_PW_INVALID);
        }
    }

    private RefreshToken saveRefreshToken(String username) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(username,
                jwtTokenUtil.generateRefreshToken(username), REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    public UserProfileRes getUserProfile(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        String reqUsername = getCurrentUsername();
        User reqUser = userRepository.findByUsername(reqUsername)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        List<Interest> interestList = interestRepository.findTop6ByUserIdOrderByInterestIdDesc(user.getId());
        List<InterestListRes> resList = InterestListRes.of(interestList);
        List<Object[]> clearList = interestRepository.checkInterestStageClear(user.getId());
        Map<String, Boolean> map = new HashMap<>();
        for (Object[] objects : clearList) {
            map.put(String.valueOf(objects[0]), Boolean.valueOf(objects[1].toString()));
        }
        resList.forEach(interestListRes -> interestListRes.setIsClear(map.get(String.valueOf(interestListRes.getPlaceId()))));

        List<FullCourse> fullCourseList;
        List<Like> likeList;
        Boolean isFollowing;

        if (user == reqUser) {
            fullCourseList = fullCourseRepository.findTop6ByUserOrderByStartedOnDesc(user);
            likeList = likeRepository.findTop6ByUser(user);
            isFollowing = null;
        } else {
            fullCourseList = fullCourseRepository.findTop6ByIsPublicAndUserOrderByStartedOnDesc(true, user);
            likeList = likeRepository.findTop6ByUserAndFullCourseIsPublic(user, true);
            isFollowing = followRepository.findByFromUserAndToUser(reqUser, user).isPresent();
        }
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
                .interestList(resList)
                .myList(myFullCourseListRes)
                .likeList(fullCourseListRes)
                .build();
    }
    // 로그인에 사용됨
    public MyInfoRes getMyInfo(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
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
    public MyInfoRes getMyInfo(Long userId) throws IllegalAccessException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        String reqUsername = getCurrentUsername();
        if (!user.getUsername().equals(reqUsername)) {
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));

        user.setBirthday(userUpdateReq.getBirthday());
        user.setGender(userUpdateReq.getGender());
        user.setNickname(userUpdateReq.getNickname());
        userRepository.save(user);
    }

    public void changePassword(ChangePasswordReq changePasswordReq, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        checkPassword(changePasswordReq.getOldPassword(), user.getPassword());
        if (!changePasswordReq.getNewPassword().equals(changePasswordReq.getPasswordCheck())) {
            throw new IllegalArgumentException(ExceptionUtil.USER_PW_INVALID);
        }

        user.setPassword(passwordEncoder.encode(changePasswordReq.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteUser(UserDeleteReq userDeleteReq, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
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
        String username = jwtTokenUtil.getUsername(refreshToken);
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username)
                .orElseThrow(()->new IllegalArgumentException(ExceptionUtil.INVALID_REFRESH_TOKEN));
        if (refreshToken.equals(redisRefreshToken.getToken())) {
            return reissueRefreshToken(refreshToken, username);
        }
        throw new IllegalArgumentException(ExceptionUtil.MISMATCH_REFRESH_TOKEN);
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
            return TokenRes.of(accessToken, saveRefreshToken(username).getToken());
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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        String username = getCurrentUsername();
        if (!username.equals(user.getUsername())) {
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
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

    public FollowRes follow(Long yourId) throws IllegalAccessException {
        String myName = getCurrentUsername();
        User you = userRepository.findById(yourId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        if (you.getUsername().equals(myName)) {
            throw new IllegalAccessException(ExceptionUtil.CANNOT_FOLLOW_MYSELF);
        }
        User me = userRepository.findByUsername(myName)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));

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

    public List<FollowListRes> followFromList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        List<Follow> followList = followRepository.findAllByToUser(user);

        return followList.stream().map(follow -> FollowListRes.builder()
                .id(follow.getFromUser().getId())
                .nickname(follow.getFromUser().getNickname())
                .profileImg(convertUtil.convertByteArrayToString(follow.getFromUser().getProfileImg()))
                .build())
            .collect(Collectors.toList());
    }

    public List<FollowListRes> followToList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        List<Follow> followList = followRepository.findAllByFromUser(user);

        return followList.stream().map(follow -> FollowListRes.builder()
                        .id(follow.getToUser().getId())
                        .nickname(follow.getToUser().getNickname())
                        .profileImg(convertUtil.convertByteArrayToString(follow.getToUser().getProfileImg()))
                        .build())
                .collect(Collectors.toList());
    }

    public Page<FullCourseListRes> getMoreUserFullCourse(Long userId, Pageable pageable) {
        User user = userRepository.getById(userId);
        String reqUsername = getCurrentUsername();
        User reqUser = userRepository.findByUsername(reqUsername)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        Page<FullCourse> page;
        if (user == reqUser) {
            page = fullCourseRepository.findAllByUserOrderByStartedOnDesc(user, pageable);
            return page.map(fullCourse -> FullCourseListRes.builder()
                    .fullCourseId(fullCourse.getFullCourseId())
                    .likeCnt(fullCourse.getLikeCnt())
                    .title(fullCourse.getTitle())
                    .startedOn(fullCourse.getStartedOn())
                    .finishedOn(fullCourse.getFinishedOn())
                    .thumbnailList(FullCourseListRes.ofThumbnailList(
                            scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(
                                    fullCourse.getFullCourseId())))
                    .scheduleDetailList(FullCourseRes.ScheduleDetail.of(scheduleRepository.findAllByFullCourseFullCourseIdOrderByDayAscSequenceAsc(fullCourse.getFullCourseId())))
                    .build());
        } else {
            page = fullCourseRepository.findAllByIsPublicAndUserOrderByStartedOnDesc(true, user, pageable);
            return page.map(fullCourse -> FullCourseListRes.builder()
                    .fullCourseId(fullCourse.getFullCourseId())
                    .likeCnt(fullCourse.getLikeCnt())
                    .title(fullCourse.getTitle())
                    .startedOn(fullCourse.getStartedOn())
                    .finishedOn(fullCourse.getFinishedOn())
                    .thumbnailList(FullCourseListRes.ofThumbnailList(
                            scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(
                                    fullCourse.getFullCourseId())))
                    .build());
        }
    }

    public Page<FullCourseListRes> getMoreLikedFullCourse(Long userId, Pageable pageable) {
        User user = userRepository.getById(userId);
        String reqUsername = getCurrentUsername();
        User reqUser = userRepository.findByUsername(reqUsername)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        Page<Like> page;
        if (user == reqUser) {
            page = likeRepository.findAllByUserId(userId, pageable);
        } else {
            page = likeRepository.findAllByUserIdAndFullCourseIsPublic(userId, pageable, true);
        }
        return page.map(like -> FullCourseListRes.builder()
                .fullCourseId(like.getFullCourse().getFullCourseId())
                .likeCnt(like.getFullCourse().getLikeCnt())
                .title(like.getFullCourse().getTitle())
                .startedOn(like.getFullCourse().getStartedOn())
                .finishedOn(like.getFullCourse().getFinishedOn())
                .thumbnailList(FullCourseListRes.ofThumbnailList(
                        scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(
                                like.getFullCourse().getFullCourseId())))
                .build());
    }
}

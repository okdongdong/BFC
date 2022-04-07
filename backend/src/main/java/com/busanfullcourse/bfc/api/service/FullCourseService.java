package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.request.FullCourseUpdateReq;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.response.FullCourseListRes;
import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.db.entity.*;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class FullCourseService {

    private final UserRepository userRepository;
    private final FullCourseRepository fullCourseRepository;
    private final WishFoodRepository wishFoodRepository;
    private final WishPlaceRepository wishPlaceRepository;
    private final ScheduleRepository scheduleRepository;
    private final LikeRepository likeRepository;
    private final ConvertUtil convertUtil;

    public Map<String, Long> createFullCourse(FullCourseReq req, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_USER));
        FullCourse fullCourse = fullCourseRepository.save(FullCourse.builder()
                .user(user)
                .isPublic(req.getIsPublic())
                .title(req.getTitle())
                .view(0)
                .startedOn(req.getStartedOn())
                .finishedOn(req.getFinishedOn())
                .likeCnt(0)
                .build());

        List<WishFood> wishFoodList = new ArrayList<>();
        for (String foodKeyword
                : req.getWishFoodKeywords()) {
            wishFoodList.add(WishFood.builder()
                    .keyword(foodKeyword)
                    .fullCourse(fullCourse)
                    .build());
        }
        wishFoodRepository.saveAll(wishFoodList);

        List<WishPlace> wishPlaceList = new ArrayList<>();
        for (String placeKeyword
                : req.getWishPlaceKeywords()) {
            wishPlaceList.add(WishPlace.builder()
                    .keyword(placeKeyword)
                    .fullCourse(fullCourse)
                    .build());
        }
        wishPlaceRepository.saveAll(wishPlaceList);
        Map<String, Long> map = new HashMap<>();
        map.put("fullCourseId", fullCourse.getFullCourseId());
        return map;
    }

    public List<FullCourseListRes> getPopularFullCourseList() {
        List<FullCourse> list = fullCourseRepository.findTop8ByLikeListSizeAndIsPublic();
        List<FullCourseListRes> listRes = FullCourseListRes.of(list);
        for (FullCourseListRes res : listRes) {
            res.setThumbnailList(FullCourseListRes
                    .ofThumbnailList(res.getScheduleList()));
        }
        return listRes;
    }

    public FullCourseRes getFullCourse(Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        List<Schedule> scheduleList = scheduleRepository.findAllByFullCourseFullCourseIdOrderByDayAscSequenceAsc(fullCourseId);
        return FullCourseRes.builder()
                .fullCourseId(fullCourseId)
                .title(fullCourse.getTitle())
                .isPublic(fullCourse.getIsPublic())
                .view(fullCourse.getView())
                .review(fullCourse.getReview())
                .startedOn(fullCourse.getStartedOn())
                .finishedOn(fullCourse.getFinishedOn())
                .scheduleDetailList(FullCourseRes.ScheduleDetail.of(scheduleList))
                .wishFoodList(FullCourseRes.ofWishFoodList(fullCourse.getWishFoods()))
                .wishPlaceList(FullCourseRes.ofWishPlaceList(fullCourse.getWishPlaces()))
                .likeCnt(fullCourse.getLikeCnt())
                .userId(fullCourse.getUser().getId())
                .nickname(fullCourse.getUser().getNickname())
                .profileImg(convertUtil.convertByteArrayToString(fullCourse.getUser().getProfileImg()))
                .build();
    }

    public void changeFullCourseDate(Long fullCourseId, FullCourseUpdateReq fullCourseUpdateReq) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        LocalDate oldStartedOn;
        LocalDate oldFinishedOn;
        LocalDate newStartedOn;
        LocalDate newFinishedOn;
        oldStartedOn = fullCourse.getStartedOn();
        oldFinishedOn = fullCourse.getFinishedOn();
        newStartedOn = LocalDate.parse(fullCourseUpdateReq.getNewStartedOn(), DateTimeFormatter.ISO_LOCAL_DATE);
        newFinishedOn = LocalDate.parse(fullCourseUpdateReq.getNewFinishedOn(), DateTimeFormatter.ISO_LOCAL_DATE);

        long oldDiff = ChronoUnit.DAYS.between(oldStartedOn, oldFinishedOn);
        long newDiff = ChronoUnit.DAYS.between(newStartedOn, newFinishedOn);
        if (newDiff < oldDiff) {
            // 바뀐 기간이 더 짧으면 모든 스케쥴을 마지막날로 밀어넣어야함
            Integer lastDay = Math.toIntExact(newDiff + 1);  // 마지막 날짜
            Optional<Schedule> finSchedule = scheduleRepository.findTop1ByFullCourseFullCourseIdAndDayOrderBySequenceDesc(fullCourseId, lastDay);
            Integer lastSeq = 0;
            if (finSchedule.isPresent()) {
                lastSeq = finSchedule.get().getSequence();
            }

            List<Schedule> changeSchedules = scheduleRepository.findAllByFullCourseFullCourseIdAndDayGreaterThanOrderByDayAscSequenceAsc(fullCourseId, lastDay);

            for (Schedule changeSchedule : changeSchedules) {
                lastSeq ++;
                changeSchedule.setDay(lastDay);
                changeSchedule.setSequence(lastSeq);
            }

            scheduleRepository.saveAll(changeSchedules);
        }
        // 바뀐 날짜 적용
        fullCourse.setStartedOn(newStartedOn);
        fullCourse.setFinishedOn(newFinishedOn);
        fullCourseRepository.save(fullCourse);
    }

    public void changeFullCoursePublic(Long fullCourseId, Map<String, Boolean> isPublic) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        fullCourse.setIsPublic(isPublic.get("isPublic"));
        fullCourseRepository.save(fullCourse);
    }

    public void changeFullCourseReview(Long fullCourseId, Map<String, String> review) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        fullCourse.setReview(review.get("review"));
        fullCourseRepository.save(fullCourse);
    }

    public Map<String,Boolean> likeFullCourse(Long fullCourseId, String username) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_USER));

        Optional<Like> like = likeRepository.findByUserAndFullCourse(user, fullCourse);

        Boolean isLiked;
        if (like.isPresent()) {
            isLiked = false;
            likeRepository.delete(like.get());
            fullCourse.setLikeCnt(fullCourse.getLikeCnt()-1);
        } else{
            isLiked = true;
            likeRepository.save(Like.builder()
                            .user(user)
                            .fullCourse(fullCourse)
                    .build());
            fullCourse.setLikeCnt(fullCourse.getLikeCnt()+1);
        }

        fullCourseRepository.save(fullCourse);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isLiked", isLiked);
        return map;

    }

    public Map<String, Boolean> getLikeFullCourse(Long fullCourseId, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_USER));
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        Optional<Like> like = likeRepository.findByUserAndFullCourse(user, fullCourse);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isLiked", like.isPresent());
        return map;
    }

    public void deleteFullCourse(Long fullCourseId) {
        if (fullCourseRepository.existsById(fullCourseId)) {
            fullCourseRepository.deleteById(fullCourseId);
        } else {
            throw new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE);
        }
    }

}

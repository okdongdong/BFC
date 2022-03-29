package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.response.FullCourseListRes;
import com.busanfullcourse.bfc.db.entity.*;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Map<String, Long> createFullCourse(FullCourseReq req, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        FullCourse fullCourse = fullCourseRepository.save(FullCourse.builder()
                .user(user)
                .isPublic(req.getIsPublic())
                .title(req.getTitle())
                .view(0)
                .startedOn(req.getStartedOn())
                .finishedOn(req.getFinishedOn())
                .build());

        List<WishFood> wishFoodList = new ArrayList<WishFood>();
        for (String foodKeyword
                : req.getWishFoodKeywords()) {
            wishFoodList.add(WishFood.builder()
                    .keyword(foodKeyword)
                    .fullCourse(fullCourse)
                    .build());
        }
        wishFoodRepository.saveAll(wishFoodList);

        List<WishPlace> wishPlaceList = new ArrayList<WishPlace>();
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
                    .ofThumbnailList(scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(res.getFullCourseId())));
        }
        return listRes;
    }

    public FullCourseRes getFullCourse(Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        List<Schedule> scheduleList = scheduleRepository.findAllByFullCourseFullCourseId(fullCourseId);
        return FullCourseRes.builder()
                .fullCourseId(fullCourseId)
                .title(fullCourse.getTitle())
                .isPublic(fullCourse.getIsPublic())
                .view(fullCourse.getView())
                .review(fullCourse.getReview())
                .startedOn(fullCourse.getStartedOn())
                .finishedOn(fullCourse.getFinishedOn())
                .scheduleDetailList(FullCourseRes.ScheduleDetail.of(scheduleList))
                .WishFoodList(FullCourseRes.ofWishFoodList(fullCourse.getWishFoods()))
                .WishPlaceList(FullCourseRes.ofWishPlaceList(fullCourse.getWishPlaces()))
                .build();
    }


    public Map<String,Boolean> likeFullCourse(Long fullCourseId, String username) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        Optional<Like> like = likeRepository.findByUserAndFullCourse(user, fullCourse);

        Boolean isLiked;
        if (like.isPresent()) {
            isLiked = false;
            likeRepository.delete(like.get());
        } else{
            isLiked = true;
            likeRepository.save(Like.builder()
                            .user(user)
                            .fullCourse(fullCourse)
                    .build());
        }

        Map<String, Boolean> map = new HashMap<>();
        map.put("isLiked", isLiked);
        return map;

    }

    public Map<String, Boolean> getLikeFullCourse(Long fullCourseId, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        Optional<Like> like = likeRepository.findByUserAndFullCourse(user, fullCourse);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isLiked", like.isPresent());
        return map;

    }

    public Page<FullCourseListRes> getMoreLikedFullCourse(Long userId, Pageable pageable) {
        Page<Like> page = likeRepository.findAllByUserId(userId, pageable);

        return page.map(like -> FullCourseListRes.builder()
                .fullCourseId(like.getFullCourse().getFullCourseId())
                .likeCnt(likeRepository.countByFullCourse(like.getFullCourse()))
                .title(like.getFullCourse().getTitle())
                .startedOn(like.getFullCourse().getStartedOn())
                .finishedOn(like.getFullCourse().getFinishedOn())
                .thumbnailList(FullCourseListRes.ofThumbnailList(scheduleRepository.findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(like.getFullCourse().getFullCourseId())))
                .build());
    }
}

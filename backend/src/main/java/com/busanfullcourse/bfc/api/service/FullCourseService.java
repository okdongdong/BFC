package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.CustomPlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.request.PlaceScheduleReq;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.db.entity.*;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
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
    private final PlaceRepository placeRepository;
    private final CustomPlaceRepository customPlaceRepository;

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

    public FullCourseRes getFullCourse(Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        List<Schedule> scheduleList = scheduleRepository.findAllByFullCourse(fullCourse);
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

    public Map<String, Long> addPlaceSchedule(PlaceScheduleReq req, Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.getById(fullCourseId);
        Place place = placeRepository.findById(req.getPlaceId()).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));
        Schedule schedule = scheduleRepository.save(Schedule.builder()
                .day(req.getDay())
                .order(req.getOrder())
                .fullCourse(fullCourse)
                .place(place)
                .build());

        Map<String, Long> map = new HashMap<>();
        map.put("scheduleId", schedule.getScheduleId());
        return map;
    }

    public Map<String, Long> addCustomPlaceSchedule(CustomPlaceScheduleReq req, Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.getById(fullCourseId);
        CustomPlace customPlace = customPlaceRepository.findById(req.getCustomPlaceId()).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));
        Schedule schedule = scheduleRepository.save(Schedule.builder()
                .day(req.getDay())
                .order(req.getOrder())
                .memo(req.getMemo())
                .fullCourse(fullCourse)
                .customPlace(customPlace)
                .build());

        Map<String, Long> map = new HashMap<>();
        map.put("scheduleId", schedule.getScheduleId());
        return map;
    }


}

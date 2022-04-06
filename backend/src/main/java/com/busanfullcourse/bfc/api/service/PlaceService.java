package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.response.PlaceListRes;
import com.busanfullcourse.bfc.api.response.PlaceDetailRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.common.util.ProcessUtil;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import com.busanfullcourse.bfc.common.cache.CacheKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;
    private final MainRecommendRepository mainRecommendRepository;
    private final RecommendRepository recommendRepository;
    private final SurveyRecommendRepository surveyRecommendRepository;


    public PlaceDetailRes getPlaceDetail(Long placeId){
        Place place = placeRepository.findRestaurantMenusById(placeId);
        return PlaceDetailRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .info(place.getInfo())
                .openTime(ProcessUtil.processOpenTime(place.getOpenTime()))
                .lat(place.getLat())
                .lon(place.getLon())
                .address(place.getAddress())
                .category(place.getCategory())
                .phone(place.getPhone())
                .label(place.getLabel())
                .station(place.getStation())
                .averageScore(place.getAverageScore())
                .thumbnail(place.getThumbnail())
                .menus(place.getMenus())
                .build();
    }


    @Cacheable(value = CacheKey.POPULAR_RESTAURANT)
    public List<PlaceListRes> getPopularRestaurantList() {
        return PlaceListRes.of(placeRepository.findTop8ByScoreCountAfterAndCategoryEqualsAndThumbnailIsNotNullOrderByAverageScoreDesc(70, true));
    }
    @Cacheable(value = CacheKey.POPULAR_ATTRACTION)
    public List<PlaceListRes> getPopularAttractionList() {
        return PlaceListRes.of(placeRepository.findTop8ByScoreCountAfterAndCategoryEqualsAndThumbnailIsNotNullOrderByAverageScoreDesc(40,false));
    }

    public List<PlaceListRes> getMainRecommendRestaurantList(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        return PlaceListRes.of(mainRecommendRepository.findTop8ByMainRecommendPlaceAndCategoryIs(user,true));
    }

    public List<PlaceListRes> getMainRecommendAttractionList(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        return PlaceListRes.of(mainRecommendRepository.findTop8ByMainRecommendPlaceAndCategoryIs(user, false));
    }

    public Page<PlaceListRes> getRecommendPlaceList(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        return PlaceListRes.ofRecommend(recommendRepository.findAllByUser(user, pageable));
    }

    public Page<PlaceListRes> getSurveyRecommendPlaceList(Long fullCourseId, Pageable pageable) {
        return PlaceListRes.ofSurveyRecommend(surveyRecommendRepository.findAllByFullCourseFullCourseId(fullCourseId, pageable));
    }
}

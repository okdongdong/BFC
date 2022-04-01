package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.response.AttractionDetailRes;
import com.busanfullcourse.bfc.api.response.AttractionListRes;
import com.busanfullcourse.bfc.api.response.RestaurantDetailRes;
import com.busanfullcourse.bfc.api.response.RestaurantListRes;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.RecommendRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    private final RecommendRepository recommendRepository;


    public RestaurantDetailRes getRestaurantDetail(Long placeId){
        Place restaurant = placeRepository.findRestaurantMenusById(placeId);
//        Place restaurant = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException("식당이 없습니다."));
        return RestaurantDetailRes.builder()
                .placeId(restaurant.getPlaceId())
                .name(restaurant.getName())
                .info(restaurant.getInfo())
                .openTime(restaurant.getOpenTime())
                .lat(restaurant.getLat())
                .lon(restaurant.getLon())
                .address(restaurant.getAddress())
                .category(restaurant.getCategory())
                .phone(restaurant.getPhone())
                .label(restaurant.getLabel())
                .station(restaurant.getStation())
                .averageScore(restaurant.getAverageScore())
                .thumbnail(restaurant.getThumbnail())
                .menus(restaurant.getMenus())
                .build();

    }

    public AttractionDetailRes getAttractionDetail(Long placeId){
        Place attraction = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException("여행지가 없습니다."));

        return AttractionDetailRes.builder()
                .placeId(attraction.getPlaceId())
                .name(attraction.getName())
                .info(attraction.getInfo())
                .openTime(attraction.getOpenTime())
                .lat(attraction.getLat())
                .lon(attraction.getLon())
                .address(attraction.getAddress())
                .category(attraction.getCategory())
                .phone(attraction.getPhone())
                .label(attraction.getLabel())
                .station(attraction.getStation())
                .averageScore(attraction.getAverageScore())
                .thumbnail(attraction.getThumbnail())
                .build();
    }

    public List<RestaurantListRes> getPopularRestaurantList() {
        return RestaurantListRes.of(placeRepository.findTop8ByScoreCountAfterAndCategoryEqualsAndThumbnailIsNotNullOrderByAverageScoreDesc(70, true));
    }

    public List<AttractionListRes> getPopularAttractionList() {
        return AttractionListRes.of(placeRepository.findTop8ByScoreCountAfterAndCategoryEqualsAndThumbnailIsNotNullOrderByAverageScoreDesc(40,false));
    }

    public List<RestaurantListRes> getRecommendRestaurantList(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return RestaurantListRes.of(recommendRepository.findTop8ByRecommendPlaceAndCategoryIs(user,true));
    }

    public List<AttractionListRes> getRecommendAttractionList(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return AttractionListRes.of(recommendRepository.findTop8ByRecommendPlaceAndCategoryIs(user, false));
    }
}

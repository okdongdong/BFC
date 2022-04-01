package com.busanfullcourse.bfc.api.response;


import com.busanfullcourse.bfc.db.entity.Place;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchPlaceListRes {

    private Long placeId;

    private String name;

    private Float averageScore;

    private Double lon;

    private Double lat;

    private String address;

    private Integer scoreCount;

    private String thumbnail;

    public static Page<SearchPlaceListRes> of (Page<Place> list) {
        return list.map(place -> SearchPlaceListRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .lon(place.getLon())
                .lat(place.getLat())
                .averageScore(place.getAverageScore())
                .scoreCount(place.getScoreCount())
                .address(place.getAddress())
                .thumbnail(place.getThumbnail())
                .build());
    }

    public static List<SearchPlaceListRes> of (List<Place> list) {
        return list.stream().map(place -> SearchPlaceListRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .lon(place.getLon())
                .lat(place.getLat())
                .averageScore(place.getAverageScore())
                .scoreCount(place.getScoreCount())
                .address(place.getAddress())
                .thumbnail(place.getThumbnail())
                .build()).collect(Collectors.toList());
    }
}

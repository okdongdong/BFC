package com.busanfullcourse.bfc.api.response;


import com.busanfullcourse.bfc.db.entity.Place;
import lombok.*;
import org.springframework.data.domain.Page;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchPlaceListRes {

    private Long placeId;

    private String name;

    private Float averageScore;

    private Float lng;

    private Float lat;

    private String thumbnail;

    public static Page<SearchPlaceListRes> of (Page<Place> list) {
        return list.map(place -> SearchPlaceListRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .lng(place.getLng())
                .lat(place.getLat())
                .averageScore(place.getAverageScore())
                .thumbnail(place.getThumbnail())
                .build());
    }
}

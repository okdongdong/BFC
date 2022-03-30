package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Place;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantListRes {
    private Long placeId;

    private String name;

    private String address;

    private String label;

    private Float averageScore;

    private String thumbnail;

    public static List<RestaurantListRes> of (List<Place> list) {
        return list.stream().map(place -> RestaurantListRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .address(place.getAddress())
                .label(place.getLabel())
                .averageScore(place.getAverageScore())
                .thumbnail(place.getThumbnail())
                .build())
                .collect(Collectors.toList());
    }


}

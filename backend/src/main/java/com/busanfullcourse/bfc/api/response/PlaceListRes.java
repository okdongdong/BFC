package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Recommend;
import lombok.*;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceListRes implements Serializable {

    private Long placeId;

    private String name;

    private String address;

    private String label;

    private Float averageScore;

    private String thumbnail;

    public static List<PlaceListRes> of (List<Place> list) {
        return list.stream().map(place -> PlaceListRes.builder()
                        .placeId(place.getPlaceId())
                        .name(place.getName())
                        .address(place.getAddress())
                        .label(place.getLabel())
                        .averageScore(place.getAverageScore())
                        .thumbnail(place.getThumbnail())
                        .build())
                .collect(Collectors.toList());
    }

    public static Page<PlaceListRes> of (Page<Recommend> list) {
        return list.map(recommend -> PlaceListRes.builder()
                .placeId(recommend.getPlace().getPlaceId())
                .name(recommend.getPlace().getName())
                .address(recommend.getPlace().getAddress())
                .label(recommend.getPlace().getLabel())
                .averageScore(recommend.getPlace().getAverageScore())
                .thumbnail(recommend.getPlace().getThumbnail())
                .build());
    }
}

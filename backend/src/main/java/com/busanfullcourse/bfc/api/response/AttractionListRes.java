package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Place;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionListRes implements Serializable {

    private Long placeId;

    private String name;

    private String address;

    private String label;

    private Float averageScore;

    private String thumbnail;

    public static List<AttractionListRes> of (List<Place> list) {
        return list.stream().map(place -> AttractionListRes.builder()
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

package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.CustomPlace;
import lombok.*;
import org.springframework.data.domain.Page;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlaceListRes {

    private Long customPlaceId;

    private String name;

    private String address;

    private Float lat;

    private Float lng;

    public static Page<CustomPlaceListRes> of (Page<CustomPlace> list) {

        return list.map(customPlace -> CustomPlaceListRes.builder()
                .customPlaceId(customPlace.getCustomPlaceId())
                .name(customPlace.getName())
                .address(customPlace.getAddress())
                .lat(customPlace.getLat())
                .lng(customPlace.getLng())
                .build());

    }
}

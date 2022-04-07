package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Menu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDetailRes {
    private Long placeId;

    private String name;

    private String info;

    private List<String> openTime;

    private Double lat;

    private Double lon;

    private String address;

    private Boolean category;

    private String phone;

    private String label;

    private String station;

    private Float averageScore;

    private Integer scoreCount;

    private String thumbnail;

    private List<Menu> menus;
}

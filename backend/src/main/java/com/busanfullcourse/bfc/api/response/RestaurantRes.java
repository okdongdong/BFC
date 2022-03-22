package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Menu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantRes {
    private Long placeId;

    private String name;

    private String info;

    private String openTime;

    private Float lat;

    private Float lng;

    private String address;

    private String category;

    private String phone;

    private String label;

    private String station;

    private Float averageScore;

    private String thumbnail;

    private List<Menu> menus;
}

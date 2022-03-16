package com.busanfullcourse.bfc.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

    private String name;

    private String info;

    @Column(name="open_time")
    private String openTime;

    @Column(name="open_day")
    private String openDay;

    private Float lat;

    private Float lng;

    private String address;

    private String category;

    private String phone;

    private String label;

    private String station;

    @Column(name = "average_score")
    private Float averageScore;

    private String thumbnail;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus = new ArrayList<>();
}

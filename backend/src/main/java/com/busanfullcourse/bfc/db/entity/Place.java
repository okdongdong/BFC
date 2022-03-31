package com.busanfullcourse.bfc.db.entity;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.annotation.Transient;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Document(indexName = "places")
@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Place {

    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    @Field(type = FieldType.Long)
    private Long placeId;

    @Field(type = FieldType.Keyword)
    private String name;

    @Field(type = FieldType.Text)
    private String info;

    @Column(name = "open_time")
    private String openTime;

    private Double lat;

    private Double lon;

    @Field(type = FieldType.Text)
    private String address;

    private Boolean category;

    private String phone;

    @Field(type = FieldType.Keyword)
    private String label;

    @Field(type = FieldType.Text)
    private String station;

    @Column(name = "average_score")
    private Float averageScore;

    @Builder.Default
    @Column(name = "score_count")
    private Integer scoreCount = 0;


    private String thumbnail = "";

    @Transient
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus = new ArrayList<>();


    @javax.persistence.Transient
    @GeoPointField
    private GeoPoint location; // = new GeoPoint(this.getLat(), this.getLon());


    @PersistenceConstructor
    public Place(Long placeId, String name, String info, String address, String station, String phone, @Value("#root.thumbnail?: ' '") String thumbnail, Double lat, Double lon, Boolean category, String label) {
        this.placeId = placeId;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.category = category;
        this.label = label;
        this.info = info;
        this.address = address;
        this.station = station;
        this.phone = phone;
        this.thumbnail = thumbnail;
        this.location = new GeoPoint(lat, lon);
    }
}

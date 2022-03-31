package com.busanfullcourse.bfc.db.entity;

import lombok.*;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.annotation.Transient;
import org.springframework.data.elasticsearch.annotations.GeoPointField;


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

    @Field(type=FieldType.Keyword)
    private String name;

    @Transient
    private String info;

    @Column(name="open_time")
    private String openTime;

    private Float lat;

    private Float lng;

    @Transient
    private String address;

    private Boolean category;

    @Transient
    private String phone;

    @Field(type = FieldType.Keyword)
    private String label;

    @Transient
    private String station;

    @Column(name = "average_score")
    private Float averageScore;

    @Builder.Default
    @Column(name = "score_count")
    private Integer scoreCount = 0;

    @Transient
    private String thumbnail;

    @Transient
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus = new ArrayList<>();


    @javax.persistence.Transient
    @GeoPointField
    private String location;


    @PersistenceConstructor
    public Place(Long placeId, String name, Float lat, Float lng, Boolean category, String label, String location) {
        this.placeId = placeId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.category = category;
        this.label = label;
        this.location = this.lat.toString() + ", " + this.lng.toString();
    }
}

package com.busanfullcourse.bfc.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "custom_place")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomPlace {
    @Id
    @Column(name = "custom_place_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customPlaceId;

    private String name;

    private String address;

    private Double lat;

    private Double lon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

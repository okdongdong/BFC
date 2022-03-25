package com.busanfullcourse.bfc.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @Column(name = "schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    private Integer day;

    private Integer order;

    private Integer memo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fullCourse_id", nullable = false)
    private FullCourse fullCourse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_place_id")
    private CustomPlace customPlace;
}

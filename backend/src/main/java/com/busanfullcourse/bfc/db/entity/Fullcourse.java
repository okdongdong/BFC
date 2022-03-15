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
public class Fullcourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fullcourse_id")
    private Long fullcourseId;

    private Long title;

    @Column(name = "is_public")
    private Long isPublic;

    private Long view;

    private Long review;

    @Column(name = "started_on")
    private Long startedOn;

    @Column(name = "finished_on")
    private Long finishedOn;

}

package com.busanfullcourse.bfc.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "survey_recommend")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SurveyRecommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_recommend_id")
    private Long mainRecommendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Place place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "full_course_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;
}

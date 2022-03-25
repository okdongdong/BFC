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
public class FullCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fullCourse_id")
    private Long fullCourseId;

    private Long title;

    @Column(name = "is_public")
    private Long isPublic;

    private Long view;

    private Long review;

    @Column(name = "started_on")
    private Long startedOn;

    @Column(name = "finished_on")
    private Long finishedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sharing> sharings = new ArrayList<>();
}

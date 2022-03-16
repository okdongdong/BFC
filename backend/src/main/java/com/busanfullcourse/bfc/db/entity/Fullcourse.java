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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "fullcourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sharing> sharings = new ArrayList<>();
}

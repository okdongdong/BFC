package com.busanfullcourse.bfc.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "full_course")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "full_course_id")
    private Long fullCourseId;

    private String title;

    @Column(name = "is_public")
    private Boolean isPublic;

    private Integer view;

    private String review;

    @Column(name = "started_on")
    private LocalDate startedOn;

    @Column(name = "finished_on")
    private LocalDate finishedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> scheduleList = new ArrayList<>();

    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sharing> sharings = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishFood> wishFoods = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishPlace> wishPlaces = new ArrayList<>();

    @Column(name = "like_count")
    private Integer likeCnt;
}

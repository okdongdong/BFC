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
public class Sharing {
    @Id
    @Column(name = "sharing_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sharingId;

    @Column(name = "is_writable")
    private Integer isWritable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fullcourse_id", nullable = false)
    private Fullcourse fullcourse;
}

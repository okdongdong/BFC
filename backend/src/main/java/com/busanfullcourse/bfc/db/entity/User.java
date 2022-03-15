package com.busanfullcourse.bfc.db.entity;


import lombok.*;

import javax.persistence.*;

import java.util.Date;

import static lombok.AccessLevel.*;

@Entity
@Table
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor(access = PROTECTED)
@NoArgsConstructor(access = PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Column(unique = true)
    private String nickname;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    private Boolean gender;

    @Column(name="profile_img")
    @Lob
    private byte[] profileImg;
}

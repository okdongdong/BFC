package com.busanfullcourse.bfc.db.entity;


import com.busanfullcourse.bfc.api.request.SignUpReq;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.*;

import static java.util.stream.Collectors.toList;
import static javax.persistence.CascadeType.ALL;
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
    private String username;

    private String password;

    @Column(unique = true)
    private String nickname;

    private LocalDate birthday;

    private Boolean gender;

    @Column(name="profile_img")
    @Lob
    private byte[] profileImg;

    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Badge> badges = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomPlace> customPlaceList = new ArrayList<>();


    @OneToMany(mappedBy = "user", cascade = ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Authority> authorities = new HashSet<>();

    public static User ofUser(SignUpReq signUpReq) {
        User user = User.builder()
                .username(signUpReq.getUsername())
                .password(signUpReq.getPassword())
                .nickname(signUpReq.getNickname())
                .birthday(signUpReq.getBirthday())
                .gender((signUpReq.getGender()))
                .build();
        user.addAuthority(Authority.ofUser(user));
        return user;
    }

    public static User ofAdmin(SignUpReq signUpReq) {
        User user = User.builder()
                .username(signUpReq.getUsername())
                .password(signUpReq.getPassword())
                .nickname(signUpReq.getNickname())
                .birthday(signUpReq.getBirthday())
                .gender((signUpReq.getGender()))
                .build();
        user.addAuthority(Authority.ofAdmin(user));
        return user;
    }

    private void addAuthority(Authority authority) {
        authorities.add(authority);
    }

    public List<String> getRoles() {
        return authorities.stream()
                .map(Authority::getRole)
                .collect(toList());
    }
}

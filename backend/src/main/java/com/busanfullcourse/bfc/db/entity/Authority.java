package com.busanfullcourse.bfc.db.entity;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Table
@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
@Builder
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "authority_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String role;

    public static Authority ofUser(User user) {
        return Authority.builder()
                .role("ROLE_USER")
                .user(user)
                .build();
    }

    public static Authority ofAdmin(User member) {
        return Authority.builder()
                .role("ROLE_ADMIN")
                .user(member)
                .build();
    }

    @Override
    public String getAuthority() {
        return role;
    }
}

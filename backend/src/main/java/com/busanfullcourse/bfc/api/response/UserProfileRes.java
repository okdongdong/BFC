package com.busanfullcourse.bfc.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileRes {
    private String username;
    private String nickname;
//    private byte[] profileImg;
//    private Boolean isFollowing;
//    private Integer followingCnt;
//    private Integer followerCnt;
//    private List<Badge> badges;
}

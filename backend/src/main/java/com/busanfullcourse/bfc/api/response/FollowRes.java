package com.busanfullcourse.bfc.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class FollowRes {

    Boolean isFollowing;
    Integer followingCnt;
    Integer followerCnt;
}

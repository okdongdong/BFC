package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Interest;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileRes {
    private String username;
    private String nickname;
    private String profileImg;
    private Boolean isFollowing;
    private Integer followingCnt;
    private Integer followerCnt;
    private List<InterestListRes> interestList;
//    private List<Badge> badges;
}

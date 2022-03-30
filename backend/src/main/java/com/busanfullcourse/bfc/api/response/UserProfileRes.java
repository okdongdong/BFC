package com.busanfullcourse.bfc.api.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileRes {
    private Long userId;
    private String username;
    private String nickname;
    private String profileImg;
    private Boolean isFollowing;
    private Integer followingCnt;
    private Integer followerCnt;
    private List<InterestListRes> interestList;
    private List<FullCourseListRes> myList;
    private List<FullCourseListRes> likeList;
//    private List<Badge> badges;
}

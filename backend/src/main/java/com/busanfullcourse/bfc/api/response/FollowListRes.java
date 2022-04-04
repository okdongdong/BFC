package com.busanfullcourse.bfc.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowListRes {

    private Long id;

    private String nickname;

    private Byte[] profileImg;

}

package com.busanfullcourse.bfc.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyInfoRes {
    private String username;
    private String nickname;
//    private byte[] profileImg;
}

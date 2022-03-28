package com.busanfullcourse.bfc.api.response;


import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class LoginRes extends TokenRes{

    private Long userId;
    private String nickname;
    private String profileImg;



    public static LoginRes of(TokenRes tokenRes, MyInfoRes myInfoRes) {
        return LoginRes.builder()
                .grantType(tokenRes.getGrantType())
                .accessToken(tokenRes.getAccessToken())
                .refreshToken(tokenRes.getRefreshToken())
                .userId(myInfoRes.getUserId())
                .nickname(myInfoRes.getNickname())
                .profileImg(myInfoRes.getProfileImg())
                .build();
    }
}

package com.busanfullcourse.bfc.api.response;


import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class LoginRes extends TokenRes{

    private String nickname;
//    private byte[] profileImg;

    public LoginRes(String grantType, String accessToken, String refreshToken) {
        super(grantType, accessToken, refreshToken);
    }

    public static LoginRes of(TokenRes tokenRes, MyInfoRes myInfoRes) {
        return LoginRes.builder()
                .grantType(tokenRes.getGrantType())
                .accessToken(tokenRes.getAccessToken())
                .refreshToken(tokenRes.getRefreshToken())
                .nickname(myInfoRes.getNickname())
                .build();
    }
}

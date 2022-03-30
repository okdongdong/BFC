package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.common.jwt.JwtHeaderEnums;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TokenRes {

    private String grantType;
    private String accessToken;
    private String refreshToken;

    public static TokenRes of(String accessToken, String refreshToken) {
        return TokenRes.builder()
                .grantType(JwtHeaderEnums.GRANT_TYPE.getValue())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}

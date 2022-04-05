package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginReq {

    private String username;
    private String password;
}

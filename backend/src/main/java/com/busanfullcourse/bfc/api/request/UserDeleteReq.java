package com.busanfullcourse.bfc.api.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDeleteReq {

    private String username;
    private String password;
}

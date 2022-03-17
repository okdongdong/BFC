package com.busanfullcourse.bfc.api.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpReq {
    private String username;
    private String password;
    private String passwordCheck;
    private String nickname;
    private LocalDate birthday;
    private Boolean gender;
}

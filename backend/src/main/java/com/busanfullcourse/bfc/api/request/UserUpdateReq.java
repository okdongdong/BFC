package com.busanfullcourse.bfc.api.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateReq {
    private String username;
    private String nickname;
    private LocalDate birthday;
    private Boolean gender;
}

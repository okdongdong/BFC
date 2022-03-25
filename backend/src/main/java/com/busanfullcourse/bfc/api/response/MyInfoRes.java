package com.busanfullcourse.bfc.api.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyInfoRes {
    private Long userId;
    private String username;
    private String nickname;
    private Boolean gender;
    private LocalDate birthday;
    private String profileImg;
}

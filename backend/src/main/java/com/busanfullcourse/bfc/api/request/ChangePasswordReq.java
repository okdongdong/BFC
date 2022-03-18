package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordReq {

    private String username;
    private String oldPassword;
    private String newPassword;
    private String passwordCheck;
}

package com.busanfullcourse.bfc.api.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginReq {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

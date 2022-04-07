package com.busanfullcourse.bfc.api.request;


import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDeleteReq {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

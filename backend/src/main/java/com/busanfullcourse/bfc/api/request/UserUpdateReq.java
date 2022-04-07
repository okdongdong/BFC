package com.busanfullcourse.bfc.api.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateReq {

    @NotBlank
    private String username;

    @NotBlank
    private String nickname;

    private LocalDate birthday;

    private Boolean gender;
}

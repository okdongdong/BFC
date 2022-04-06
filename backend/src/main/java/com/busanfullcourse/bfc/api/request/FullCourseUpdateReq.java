package com.busanfullcourse.bfc.api.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseUpdateReq {

    @NotBlank
    private String newStartedOn;

    @NotBlank
    private String newFinishedOn;

}

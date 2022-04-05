package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseUpdateReq {

    private String newStartedOn;

    private String newFinishedOn;

}

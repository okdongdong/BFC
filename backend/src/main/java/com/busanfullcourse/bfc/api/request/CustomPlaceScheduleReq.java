package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlaceScheduleReq {

    private Long customPlaceId;

    private Integer day;

    private Integer sequence;

    private String memo;
}

package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleUpdateReq {

    private Long scheduleId;

    private Integer dayBefore;

    private Integer sequenceBefore;

    private Integer dayAfter;

    private Integer sequenceAfter;

}

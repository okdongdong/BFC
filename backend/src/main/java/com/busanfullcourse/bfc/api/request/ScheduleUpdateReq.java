package com.busanfullcourse.bfc.api.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleUpdateReq {

    @NotBlank
    private Long scheduleId;

    @Range(min = 1, max = 99)
    private Integer dayBefore;

    @Range(min = 1, max = 99)
    private Integer sequenceBefore;

    @Range(min = 1, max = 99)
    private Integer dayAfter;

    @Range(min = 1, max = 99)
    private Integer sequenceAfter;

}

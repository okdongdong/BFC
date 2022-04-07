package com.busanfullcourse.bfc.api.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceScheduleReq {

    @NotBlank
    private Long placeId;

    @Range(min = 1, max = 99)
    private Integer day;

    @Range(min = 1, max = 99)
    private Integer sequence;

}

package com.busanfullcourse.bfc.api.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlaceScheduleReq {

    @NotBlank
    private String name;

    private String address;

    private Double lat;

    private Double lon;

    @NotBlank
    private Long fullCourseId;

    @Range(min = 1, max = 99)
    private Integer day;

    @Range(min = 1, max = 99)
    private Integer sequence;

    private String memo;

}

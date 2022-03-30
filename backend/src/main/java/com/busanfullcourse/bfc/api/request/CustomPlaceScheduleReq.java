package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlaceScheduleReq {

    private String name;

    private String address;

    private Float lat;

    private Float lng;

    private Long fullCourseId;

    private Integer day;

    private Integer sequence;

    private String memo;

}

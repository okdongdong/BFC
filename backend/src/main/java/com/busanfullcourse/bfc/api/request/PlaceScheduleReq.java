package com.busanfullcourse.bfc.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceScheduleReq {

    private Long placeId;

    private Integer day;

    private Integer sequence;

}

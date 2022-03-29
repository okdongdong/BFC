package com.busanfullcourse.bfc.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionListRes {

    private Long placeId;

    private String name;

    private String address;

    private String label;

    private Float averageScore;

    private String thumbnail;
}

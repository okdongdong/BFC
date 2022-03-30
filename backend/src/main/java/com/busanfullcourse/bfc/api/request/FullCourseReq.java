package com.busanfullcourse.bfc.api.request;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseReq {

    private String title;

    private Boolean isPublic;

    private LocalDate startedOn;

    private LocalDate finishedOn;

    private List<String> wishFoodKeywords;

    private List<String> wishPlaceKeywords;

}

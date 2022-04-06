package com.busanfullcourse.bfc.api.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseReq {

    @NotBlank
    private String title;

    @NotBlank
    private Boolean isPublic;

    @NotBlank
    private LocalDate startedOn;

    @NotBlank
    private LocalDate finishedOn;

    private List<String> wishFoodKeywords;

    private List<String> wishPlaceKeywords;

}

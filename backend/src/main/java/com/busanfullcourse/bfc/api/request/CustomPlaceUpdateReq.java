package com.busanfullcourse.bfc.api.request;

import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlaceUpdateReq {

    @NotBlank
    private String name;

    private String address;

    private Double lat;

    private Double lon;

}

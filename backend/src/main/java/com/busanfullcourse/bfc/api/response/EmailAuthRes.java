package com.busanfullcourse.bfc.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailAuthRes {
    private String code;
}

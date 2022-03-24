package com.busanfullcourse.bfc.api.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScoreReq {
    private Long userId;
    private Float score;
}

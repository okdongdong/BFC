package com.busanfullcourse.bfc.api.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewListRes {

    private Long reviewId;

    private String content;

    private Long userId;

    private String nickname;

    private String profileImg;

    private LocalDateTime postedAt;

    private LocalDateTime updatedAt;

}

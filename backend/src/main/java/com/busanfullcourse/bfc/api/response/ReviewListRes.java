package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Review;
import lombok.*;
import org.springframework.data.domain.Page;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewListRes {

    private Long reviewId;

    private String content;

    private Long userId;

    private String username;

    public static Page<ReviewListRes> of (Page<Review> list) {
        return list.map(review -> ReviewListRes.builder()
                .reviewId(review.getReviewId())
                .content(review.getContent())
                .userId(review.getUser().getId())
                .username(review.getUser().getUsername())
                .build());
    }
}

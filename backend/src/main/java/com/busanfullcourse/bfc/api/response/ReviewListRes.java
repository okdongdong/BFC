package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.db.entity.Review;
import lombok.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewListRes {

    private static ConvertUtil convertUtil;

    private Long reviewId;

    private String content;

    private Long userId;

    private String nickname;

    private String profileImg;

    private LocalDateTime postedAt;

    private LocalDateTime updatedAt;

    public static Page<ReviewListRes> of (Page<Review> list) {
        return list.map(review -> ReviewListRes.builder()
                .reviewId(review.getReviewId())
                .content(review.getContent())
                .userId(review.getUser().getId())
                .nickname(review.getUser().getNickname())
                .profileImg(convertUtil.convertByteArrayToString(review.getUser().getProfileImg()))
                .postedAt(review.getPostedAt())
                .updatedAt(review.getUpdatedAt())
                .build());
    }
}

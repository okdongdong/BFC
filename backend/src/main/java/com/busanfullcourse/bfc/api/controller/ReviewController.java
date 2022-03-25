package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.ReviewUpdateReq;
import com.busanfullcourse.bfc.api.response.ReviewListRes;
import com.busanfullcourse.bfc.api.service.ReviewService;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping("/place/{placeId}")
    public ResponseEntity<String> createReview(@RequestBody ReviewUpdateReq req, @PathVariable Long placeId) {
        String username = userService.getCurrentUsername();
        reviewService.createReview(req, username, placeId);
        return ResponseEntity.ok("리뷰가 작성되었습니다.");
    }

    @GetMapping("/place/{placeId}")
    public ResponseEntity<Page<ReviewListRes>> getReviewList(
            @PathVariable Long placeId,
            @PageableDefault(size = 5, sort = "reviewId", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ReviewListRes.of(reviewService.getReviewListByPlaceId(placeId, pageable)));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<String> updateReview(@RequestBody ReviewUpdateReq req, @PathVariable Long reviewId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        reviewService.updateReview(req, username, reviewId);
        return ResponseEntity.ok("리뷰가 수정되었습니다.");
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteCustomPlace(@PathVariable Long reviewId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        reviewService.deleteReview(reviewId, username);
        return ResponseEntity.ok("리뷰가 삭제되었습니다.");
    }
}

package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.ReviewUpdateReq;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Review;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.ReviewRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;


    public void createReview(ReviewUpdateReq req, String username, Long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        reviewRepository.save(
                Review.builder()
                        .content(req.getContent())
                        .place(place)
                        .user(user)
                        .build()
        );
    }

    public Page<Review> getReviewListByPlaceId(Long placeId, Pageable pageable) {
        return reviewRepository.findAllByPlacePlaceId(placeId, pageable);
    }

    public void updateReview(ReviewUpdateReq req, String username, Long reviewId) throws IllegalAccessException {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new NoSuchElementException("찾으시는 리뷰가 없습니다."));
        if (!username.equals(review.getUser().getUsername())) {
            throw new IllegalAccessException("자신이 작성한 리뷰만 수정할 수 있습니다");
        }
        review.setContent(req.getContent());
        reviewRepository.save(review);

    }

    public void deleteReview(Long reviewId, String username) throws IllegalAccessException {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new NoSuchElementException("찾으시는 리뷰가 없습니다."));
        if (!username.equals(review.getUser().getUsername())) {
            throw new IllegalAccessException("자신이 작성한 리뷰만 삭제할 수 있습니다");
        }
        reviewRepository.deleteById(reviewId);
    }
}

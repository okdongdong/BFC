package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAllByPlacePlaceId(Long placeId, Pageable pageable);
}

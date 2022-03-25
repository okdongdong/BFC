package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score findByPlacePlaceIdAndUserUsername(Long placeId, String username);
}

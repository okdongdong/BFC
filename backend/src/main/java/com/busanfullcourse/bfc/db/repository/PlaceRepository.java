package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceQueryRepository {
    List<Place> findTop8ByScoreCountAfterAndCategoryEqualsAndThumbnailIsNotNullOrderByAverageScoreDesc(Integer scoreCount, Boolean category);
}

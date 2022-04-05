package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.SurveyRecommend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRecommendRepository extends JpaRepository<SurveyRecommend, Long> {
    @EntityGraph(attributePaths = {"place"})
    Page<SurveyRecommend> findAllByFullCourseFullCourseId(Long fullCourseId, Pageable pageable);
}

package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Recommend;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    @EntityGraph(attributePaths = {"place"})
    Page<Recommend> findAllByUser(User user, Pageable pageable);

    @EntityGraph(attributePaths = {"place"})
    List<Recommend> findAllByUserAndCategoryIs(User user, Boolean category);
}

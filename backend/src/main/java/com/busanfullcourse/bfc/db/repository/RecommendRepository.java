package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
}

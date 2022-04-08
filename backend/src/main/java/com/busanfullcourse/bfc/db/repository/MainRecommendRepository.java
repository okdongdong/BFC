package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.MainRecommend;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MainRecommendRepository extends JpaRepository<MainRecommend, Long>, MainRecommendQueryRepository {

    @EntityGraph(attributePaths = {"place"})
    List<MainRecommend> findAllByUserAndCategoryIs(User user, Boolean category);
}

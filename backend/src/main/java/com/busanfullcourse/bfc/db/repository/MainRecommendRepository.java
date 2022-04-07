package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.MainRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MainRecommendRepository extends JpaRepository<MainRecommend, Long>, MainRecommendQueryRepository {

}

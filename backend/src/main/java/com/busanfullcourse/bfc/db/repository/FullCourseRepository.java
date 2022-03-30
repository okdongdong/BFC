package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FullCourseRepository extends JpaRepository<FullCourse, Long>, FullCourseQueryRepository {

    List<FullCourse> findTop6ByUserOrderByStartedOn(User user);

    Page<FullCourse> findAllByUserOrderByStartedOn(User user, Pageable pageable);
}

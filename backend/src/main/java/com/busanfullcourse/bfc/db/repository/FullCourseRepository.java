package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FullCourseRepository extends JpaRepository<FullCourse, Long>, FullCourseQueryRepository {
}

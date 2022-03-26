package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Schedule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @EntityGraph(attributePaths = {"place"})
    List<Schedule> findAllByFullCourseFullCourseId(Long fullCourseId);

    Boolean existsByFullCourseFullCourseIdAndDayAndSequence(Long fullCourseId, Integer day, Integer seq);

}

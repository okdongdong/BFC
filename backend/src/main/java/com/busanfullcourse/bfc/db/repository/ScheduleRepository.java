package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Schedule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @EntityGraph(attributePaths = {"place"})
    List<Schedule> findAllByFullCourseFullCourseIdOrderByDayAscSequenceAsc(Long fullCourseId);

    Boolean existsByFullCourseFullCourseIdAndDayAndSequence(Long fullCourseId, Integer day, Integer seq);

    @EntityGraph(attributePaths = {"place"})
    List<Schedule> findTop4ByFullCourseFullCourseIdAndPlaceIsNotNullAndPlaceThumbnailIsNotNull(Long fullCourseId);

    // 특정 day에서, seq보다 큰
    List<Schedule> findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThan(
            Long fullCourseId, Integer day, Integer seq);

    // 특정 day에서, seq보다 크거나 같은
    List<Schedule> findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanEqual(
            Long fullCourseId, Integer day, Integer seq);

    // 특정 day에서, seqA보다 크고 seqB보다 작거나 같은
    List<Schedule> findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanAndSequenceLessThanEqual(
            Long fullCourseId, Integer day, Integer seqA, Integer seqB);

    // 특정 day에서, seqA보다 크거나 같고 seqB보다 작은
    List<Schedule> findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanEqualAndSequenceLessThan(
            Long fullCourseId, Integer day, Integer seqA, Integer seqB);

    // 수정용... 기준일자
    Optional<Schedule> findTop1ByFullCourseFullCourseIdAndDayOrderBySequenceDesc(Long fullCourseId, Integer day);

    // 수정해야할 스케줄들
    List<Schedule> findAllByFullCourseFullCourseIdAndDayGreaterThanOrderByDayAscSequenceAsc(Long fullCourseId, Integer day);

}

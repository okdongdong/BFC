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

    // 다른사람 프로필 조회할 때 가져올 상위 6개
    List<FullCourse> findTop6ByIsPublicAndUserOrderByStartedOnDesc(Boolean isPublic,User user);

    // 다른사람 프로필 조회할 때 가져올 paging
    Page<FullCourse> findAllByIsPublicAndUserOrderByStartedOnDesc(Boolean isPublic, User user, Pageable pageable);

    // 내 프로필 조회할 때 가져올 상위 6개
    List<FullCourse> findTop6ByUserOrderByStartedOnDesc(User user);

    // 내 프로필 조회할 때 가져올 paging
    Page<FullCourse> findAllByUserOrderByStartedOnDesc(User user, Pageable pageable);

}

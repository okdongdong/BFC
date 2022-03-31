package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Like;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndFullCourse(User user, FullCourse fullCourse);

    // 내 프로필 조회할 때 가져올 상위 6개
    @EntityGraph(attributePaths = {"fullCourse"})
    List<Like> findTop6ByUser(User user);

    // 내 프로필 조회할 때 가져올 페이징
    Page<Like> findAllByUserId(Long userId, Pageable pageable);

    // 다른 사람 프로필 조회할 때 가져올 상위 6개
    @EntityGraph(attributePaths = {"fullCourse"})
    List<Like> findTop6ByUserAndFullCourseIsPublic(User user, Boolean isPublic);

    // 다른 사람 프로필 조회할 때 가져올 페이징
    Page<Like> findAllByUserIdAndFullCourseIsPublic(Long userId, Pageable pageable, Boolean isPublic);

}

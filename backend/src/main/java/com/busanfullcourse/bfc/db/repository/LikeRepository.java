package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Like;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndFullCourse(User user, FullCourse fullCourse);

    @EntityGraph(attributePaths = {"fullCourse"})
    List<Like> findTop6ByUser(User user);
    Integer countByFullCourse(FullCourse fullCourse);
}

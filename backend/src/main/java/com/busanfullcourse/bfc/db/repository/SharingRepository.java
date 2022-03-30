package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Sharing;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SharingRepository extends JpaRepository<Sharing, Long> {

    Optional<Sharing> findByFullCourseAndUser(FullCourse fullCourse, User user);

//    List<Sharing> findAllByFullCourse(FullCourse fullCourse);
}

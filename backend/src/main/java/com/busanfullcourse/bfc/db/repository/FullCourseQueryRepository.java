package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;

import java.util.List;

public interface FullCourseQueryRepository {
    List<FullCourse> findTop8ByLikeListSizeAndIsPublic();
}

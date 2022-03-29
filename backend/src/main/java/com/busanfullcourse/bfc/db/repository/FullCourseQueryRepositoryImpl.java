package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.busanfullcourse.bfc.db.entity.QFullCourse.fullCourse;
import static com.busanfullcourse.bfc.db.entity.QLike.like;


@RequiredArgsConstructor
public class FullCourseQueryRepositoryImpl implements FullCourseQueryRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<FullCourse> findTop8ByLikeListSizeAndIsPublic() {

        return queryFactory
                .select(fullCourse)
                .from(fullCourse)
                .leftJoin(fullCourse.likeList, like)
                .fetchJoin()
                .orderBy(fullCourse.likeList.size().desc())
                .limit(8)
                .fetch();

    }
}

package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.busanfullcourse.bfc.db.entity.QFullCourse.fullCourse;
import static com.busanfullcourse.bfc.db.entity.QSchedule.schedule;


@RequiredArgsConstructor
public class FullCourseQueryRepositoryImpl implements FullCourseQueryRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<FullCourse> findTop8ByLikeListSizeAndIsPublic() {

        return queryFactory
                .select(fullCourse)
                .from(fullCourse)
                .leftJoin(fullCourse.scheduleList, schedule)
                .fetchJoin()
                .leftJoin(schedule.place)
                .fetchJoin()
                .where(fullCourse.isPublic.eq(true))
                .orderBy(fullCourse.likeCnt.desc())
                .limit(8)
                .fetch();

    }
}

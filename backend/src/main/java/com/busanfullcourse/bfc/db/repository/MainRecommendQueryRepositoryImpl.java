package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.busanfullcourse.bfc.db.entity.QMainRecommend.mainRecommend;
import static com.busanfullcourse.bfc.db.entity.QPlace.place;

@RequiredArgsConstructor
public class MainRecommendQueryRepositoryImpl implements MainRecommendQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Place> findTop8ByMainRecommendPlaceAndCategoryIs(User user, Boolean category) {
        return queryFactory.select(mainRecommend.place)
                .from(mainRecommend)
                .leftJoin(place)
                .fetchJoin()
                .where(mainRecommend.user.eq(user).and(mainRecommend.category.eq(category)))
                .orderBy(NumberExpression.random().desc())
                .limit(8)
                .fetch();
    }
}

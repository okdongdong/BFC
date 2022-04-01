package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.busanfullcourse.bfc.db.entity.QRecommend.recommend;
import static com.busanfullcourse.bfc.db.entity.QPlace.place;

@RequiredArgsConstructor
public class RecommendQueryRepositoryImpl implements RecommendQueryRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Place> findTop8ByRecommendPlaceAndCategoryIs(User user, Boolean category) {
        return queryFactory.select(recommend.place)
                .from(recommend)
                .leftJoin(place)
                .fetchJoin()
                .where(recommend.user.eq(user).and(recommend.category.eq(category)))
                .orderBy(NumberExpression.random().desc())
                .limit(8)
                .fetch();
    }
}

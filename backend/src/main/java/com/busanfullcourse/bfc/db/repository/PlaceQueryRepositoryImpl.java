package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import static com.busanfullcourse.bfc.db.entity.QMenu.menu;
import static com.busanfullcourse.bfc.db.entity.QPlace.place;


@RequiredArgsConstructor
public class PlaceQueryRepositoryImpl implements PlaceQueryRepository{

    private final JPAQueryFactory queryFactory;


    @Override
    public Place findRestaurantMenusById(Long placeId) {

        return queryFactory
                .selectFrom(place)
                .leftJoin(place.menus, menu)
                .fetchJoin()
                .where(place.placeId.eq(placeId))
                .fetchOne();

    }
}

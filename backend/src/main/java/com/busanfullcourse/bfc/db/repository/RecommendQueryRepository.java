package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;

import java.util.List;

public interface RecommendQueryRepository {
    List<Place> findTop8ByRecommendPlaceAndCategoryIs(User user, Boolean category);
}

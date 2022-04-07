package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;

import java.util.List;

public interface MainRecommendQueryRepository {
    List<Place> findTop8ByMainRecommendPlaceAndCategoryIs(User user, Boolean category);
}

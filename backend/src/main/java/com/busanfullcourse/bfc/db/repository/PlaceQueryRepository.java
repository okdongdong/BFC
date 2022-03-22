package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Place;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceQueryRepository {
    Place findRestaurantMenusById(Long playerId);
}

package com.busanfullcourse.bfc.db.repository.elasticsearch;

import com.busanfullcourse.bfc.db.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NearPlaceSearchRepository {

    Page<Place> searchByGeoPointAndDistance(Double lat, Double lon, Integer distance, Pageable pageable);

}

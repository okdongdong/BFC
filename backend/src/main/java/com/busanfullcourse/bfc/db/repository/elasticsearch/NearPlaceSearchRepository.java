package com.busanfullcourse.bfc.db.repository.elasticsearch;

import java.util.List;

public interface NearPlaceSearchRepository {

    List<String> searchByGeoPointAndDistance(Double lat, Double lon, Integer distance);
}

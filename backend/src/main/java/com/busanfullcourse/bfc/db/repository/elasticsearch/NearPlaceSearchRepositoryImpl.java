package com.busanfullcourse.bfc.db.repository.elasticsearch;


import com.busanfullcourse.bfc.db.entity.Place;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.GeoDistanceQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;


import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class NearPlaceSearchRepositoryImpl implements NearPlaceSearchRepository{

    private final ElasticsearchOperations elasticsearchOperations;



    @Override
    public Page<Place> searchByGeoPointAndDistance(Double lat, Double lon, Integer distance, Pageable pageable) {

        GeoDistanceQueryBuilder qb = QueryBuilders.geoDistanceQuery("location")
                .point(lat, lon)
                .distance(distance, DistanceUnit.METERS);

        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(qb)
//                .withSort(SortBuilders.geoDistanceSort("location", lat, lon).order(SortOrder.ASC))
                .withSort(SortBuilders.fieldSort("averageScore").order(SortOrder.DESC))
                .build();
        List<Place> list = elasticsearchOperations.search(searchQuery, Place.class).stream().map(SearchHit::getContent).collect(Collectors.toList());
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), list.size());
        return new PageImpl<>(list.subList(start,end), pageable, list.size());

    }
}

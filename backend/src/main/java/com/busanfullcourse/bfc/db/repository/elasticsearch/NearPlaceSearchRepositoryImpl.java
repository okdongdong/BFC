package com.busanfullcourse.bfc.db.repository.elasticsearch;


import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class NearPlaceSearchRepositoryImpl implements NearPlaceSearchRepository{


    private final RestHighLevelClient client;


    @Override
    public List<String> searchByGeoPointAndDistance(Double lat, Double lon, Integer distance) {

        QueryBuilder qb = QueryBuilders.geoDistanceQuery("places.location")
                .point(lat, lon)
                .distance(distance, DistanceUnit.METERS);


        SearchSourceBuilder source = new SearchSourceBuilder().query(qb);
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.source(source);

        try {
            SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
            return Arrays.stream(response.getHits()
                            .getHits())
                    .map(SearchHit::getId)
                    .collect(Collectors.toList());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;

    }
}

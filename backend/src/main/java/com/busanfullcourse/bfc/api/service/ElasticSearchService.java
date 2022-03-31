package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.SearchPlaceListRes;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.elasticsearch.PlaceSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ElasticSearchService {

    private final PlaceSearchRepository placeSearchRepository;
    private final PlaceRepository placeRepository;

    public Page<SearchPlaceListRes> searchPlaceByName(String name, Pageable pageable) {
        Page<Place> list = placeSearchRepository.findByNameContains(name, pageable);
        return SearchPlaceListRes.of(list);
    }

    public Page<Place> searchAll(Pageable pageable) {
        return placeSearchRepository.findAll(pageable);
    }

    public void saveAll() {
        placeSearchRepository.saveAll(placeRepository.findAll());
    }

    public void deleteAll() {
        placeSearchRepository.deleteAll();
    }

    public Page<SearchPlaceListRes> searchByDistance(Double lat, Double lon, Integer distance, Pageable pageable) {
        List<String> ids = placeSearchRepository.searchByGeoPointAndDistance(lat, lon, distance);

        return SearchPlaceListRes.of(placeSearchRepository
                .findAllByPlaceId(ids.stream().map(Long::parseLong).collect(Collectors.toList()), pageable));
    }
}

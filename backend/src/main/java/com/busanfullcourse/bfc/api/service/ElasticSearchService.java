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
}

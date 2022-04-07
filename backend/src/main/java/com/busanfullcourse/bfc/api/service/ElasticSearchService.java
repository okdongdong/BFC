package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.PlaceListRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.db.entity.CustomPlace;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Schedule;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.ScheduleRepository;
import com.busanfullcourse.bfc.db.repository.elasticsearch.PlaceSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ElasticSearchService {

    private final PlaceSearchRepository placeSearchRepository;
    private final PlaceRepository placeRepository;
    private final ScheduleRepository scheduleRepository;

    public Page<PlaceListRes> searchPlaceByName(String name, Pageable pageable) {
        Page<Place> list = placeSearchRepository.findByNameContains(name.strip(), pageable);
        return PlaceListRes.of(list);
    }

    public Page<Place> searchAll(Pageable pageable) {
        return placeSearchRepository.findAll(pageable);
    }

    public Page<Place> searchPlaceByNameByJPA(String name, Pageable pageable) {
        return placeRepository.findByNameContains(name.strip(),pageable);
    }

    public void saveAll() {
        List<Place> places = placeRepository.findAll();
        places.forEach(place -> place.setLocation(new GeoPoint(place.getLat(), place.getLon())));
        placeSearchRepository.saveAll(places);
    }

    public void deleteAll() {
        placeSearchRepository.deleteAll();
    }

    public Page<PlaceListRes> searchByDistance(Long scheduleId, Integer distance, Pageable pageable) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.SCHEDULE_NOT_FOUND));
        Place place = schedule.getPlace();
        Page<Place> list;

        if (place == null) {
            CustomPlace customPlace = schedule.getCustomPlace();
            list = placeSearchRepository.searchByGeoPointAndDistance(customPlace.getLat(), customPlace.getLon(), distance, pageable);
        } else {
            list = placeSearchRepository.searchByGeoPointAndDistance(place.getLat(), place.getLon(), distance, pageable);
        }

        if (place != null) {
            Iterator<Place> iterator = list.iterator();
            while (iterator.hasNext()) {
                Place now = iterator.next();
                if (Objects.equals(now.getPlaceId(), place.getPlaceId())) {
                    iterator.remove();
                    break;
                }
            }
        }
        return PlaceListRes.of(list);
    }
}

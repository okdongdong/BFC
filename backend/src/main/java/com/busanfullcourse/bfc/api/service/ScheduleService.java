package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.CustomPlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.PlaceScheduleReq;
import com.busanfullcourse.bfc.db.entity.CustomPlace;
import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Schedule;
import com.busanfullcourse.bfc.db.repository.CustomPlaceRepository;
import com.busanfullcourse.bfc.db.repository.FullCourseRepository;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final FullCourseRepository fullCourseRepository;
    private final ScheduleRepository scheduleRepository;
    private final PlaceRepository placeRepository;
    private final CustomPlaceRepository customPlaceRepository;

    public Map<String, Long> addPlaceSchedule(PlaceScheduleReq req, Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.getById(fullCourseId);
        Place place = placeRepository.findById(req.getPlaceId()).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));

        // 중복된 일정이 있는지 검사
        if(scheduleRepository.existsByFullCourseFullCourseIdAndDayAndSequence(fullCourseId, req.getDay(), req.getSequence())) {
            throw new IllegalArgumentException("해당 일정이 이미 존재합니다.");
        }

        Schedule schedule = scheduleRepository.save(Schedule.builder()
                .day(req.getDay())
                .sequence(req.getSequence())
                .fullCourse(fullCourse)
                .place(place)
                .build());

        Map<String, Long> map = new HashMap<>();
        map.put("scheduleId", schedule.getScheduleId());
        return map;
    }

    public Map<String, Long> addCustomPlaceSchedule(CustomPlaceScheduleReq req, Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.getById(fullCourseId);
        CustomPlace customPlace = customPlaceRepository.findById(req.getCustomPlaceId()).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));

        // 중복된 일정이 있는지 검사
        if (scheduleRepository.existsByFullCourseFullCourseIdAndDayAndSequence(fullCourseId, req.getDay(), req.getSequence())) {
            throw new IllegalArgumentException("해당 일정이 이미 존재합니다.");
        }

        Schedule schedule = scheduleRepository.save(Schedule.builder()
                .day(req.getDay())
                .sequence(req.getSequence())
                .memo(req.getMemo())
                .fullCourse(fullCourse)
                .customPlace(customPlace)
                .build());

        Map<String, Long> map = new HashMap<>();
        map.put("scheduleId", schedule.getScheduleId());
        return map;
    }

    public void deleteSchedule(Long scheduleId) {
        Schedule scheduleDel = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new NoSuchElementException("스케줄이 없습니다."));

        List<Schedule> schedules = scheduleRepository
                .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThan(
                        scheduleDel.getFullCourse().getFullCourseId(), scheduleDel.getDay(), scheduleDel.getSequence());

        scheduleRepository.deleteById(scheduleId);
        for (Schedule schedule : schedules) {
            schedule.setSequence(schedule.getSequence()-1);
        }
        scheduleRepository.saveAll(schedules);
    }
}

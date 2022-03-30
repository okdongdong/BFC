package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.CustomPlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.PlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.ScheduleUpdateReq;
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

    public Map<String, Long> addPlaceSchedule(PlaceScheduleReq req, Long fullCourseId) {
        FullCourse fullCourse = fullCourseRepository.getById(fullCourseId);
        Place place = placeRepository.findById(req.getPlaceId()).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));

        List<Schedule> schedules = scheduleRepository
                .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanEqual(
                        fullCourseId, req.getDay(), req.getSequence());

        for (Schedule schedule : schedules) {
            schedule.setSequence(schedule.getSequence()+1);
        }

        Schedule scheduleNew = Schedule.builder()
                .day(req.getDay())
                .sequence(req.getSequence())
                .fullCourse(fullCourse)
                .place(place)
                .build();
        schedules.add(scheduleNew);
        scheduleRepository.saveAll(schedules);

        Map<String, Long> map = new HashMap<>();
        map.put("scheduleId", scheduleNew.getScheduleId());
        return map;
    }

    public void changeSchedule(Long fullCourseId, ScheduleUpdateReq scheduleUpdateReq) {
        if (!fullCourseRepository.existsById(fullCourseId)) {
            throw new NoSuchElementException("풀코스가 없습니다.");
        }

        if (scheduleUpdateReq.getDayBefore().equals(scheduleUpdateReq.getDayAfter())) {
            if (scheduleUpdateReq.getSequenceBefore() < scheduleUpdateReq.getSequenceAfter()) {
                // 같은날, 더 뒤로 옮기는 경우
                List<Schedule> schedules = scheduleRepository
                        .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanAndSequenceLessThanEqual(
                                fullCourseId, scheduleUpdateReq.getDayBefore(),
                                scheduleUpdateReq.getSequenceBefore(), scheduleUpdateReq.getSequenceAfter());

                for (Schedule schedule : schedules) {
                    schedule.setSequence(schedule.getSequence()-1);
                }
                Schedule targetSchedule = scheduleRepository.getById(scheduleUpdateReq.getScheduleId());
                targetSchedule.setSequence(scheduleUpdateReq.getSequenceAfter());
                schedules.add(targetSchedule);
                scheduleRepository.saveAll(schedules);
            } else if (scheduleUpdateReq.getSequenceBefore() > scheduleUpdateReq.getSequenceAfter()) {
                // 같은날, 더 앞으로 당기는 경우
                List<Schedule> schedules = scheduleRepository
                        .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanEqualAndSequenceLessThan(
                                fullCourseId, scheduleUpdateReq.getDayBefore(),
                                scheduleUpdateReq.getSequenceAfter(), scheduleUpdateReq.getSequenceBefore());

                for (Schedule schedule : schedules) {
                    schedule.setSequence(schedule.getSequence()+1);
                }
                Schedule targetSchedule = scheduleRepository.getById(scheduleUpdateReq.getScheduleId());
                targetSchedule.setSequence(scheduleUpdateReq.getSequenceAfter());
                schedules.add(targetSchedule);
                scheduleRepository.saveAll(schedules);
            }
        } else {
            // 다른날로 바꾸는 경우
            Schedule targetSchedule = scheduleRepository.getById(scheduleUpdateReq.getScheduleId());
            // before보다 seq가 큰 것들 다 가져와
            List<Schedule> schedulesBefore = scheduleRepository
                    .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThan(
                            fullCourseId, scheduleUpdateReq.getDayBefore(), scheduleUpdateReq.getSequenceBefore());

            for (Schedule scheduleBefore : schedulesBefore) {
                scheduleBefore.setSequence(scheduleBefore.getSequence()-1);
            }
            // agter보다 seq가 크거나 같은 것들 다 가져와
            List<Schedule> schedulesAfter = scheduleRepository
                    .findSchedulesByFullCourseFullCourseIdAndDayAndSequenceGreaterThanEqual(
                            fullCourseId, scheduleUpdateReq.getDayAfter(), scheduleUpdateReq.getSequenceAfter());

            for (Schedule scheduleAfter : schedulesAfter) {
                scheduleAfter.setSequence(scheduleAfter.getSequence()+1);
            }
            targetSchedule.setDay(scheduleUpdateReq.getDayAfter());
            targetSchedule.setSequence(scheduleUpdateReq.getSequenceAfter());
            schedulesBefore.addAll(schedulesAfter);
            schedulesBefore.add(targetSchedule);
            scheduleRepository.saveAll(schedulesBefore);
        }
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

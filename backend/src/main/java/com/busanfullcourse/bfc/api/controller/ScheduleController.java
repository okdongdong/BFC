package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.CustomPlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.PlaceScheduleReq;
import com.busanfullcourse.bfc.api.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/{fullCourseId}/place")
    public ResponseEntity<Map<String, Long>> addPlaceSchedule(@PathVariable Long fullCourseId , @RequestBody PlaceScheduleReq req) {
        return ResponseEntity.ok(scheduleService.addPlaceSchedule(req, fullCourseId));
    }

    @PostMapping("/{fullCourseId}/customPlace")
    public ResponseEntity<Map<String, Long>> addCustomPlaceSchedule(@PathVariable Long fullCourseId, @RequestBody CustomPlaceScheduleReq req) {
        return ResponseEntity.ok(scheduleService.addCustomPlaceSchedule(req, fullCourseId));
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<String> deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok("스케줄이 삭제되었습니다.");
    }
}

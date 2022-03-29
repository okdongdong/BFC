package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.CustomPlaceScheduleReq;
import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.request.PlaceScheduleReq;
import com.busanfullcourse.bfc.api.response.FullCourseListRes;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.service.FullCourseService;
import com.busanfullcourse.bfc.api.service.ScheduleService;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fullCourse")
@RequiredArgsConstructor
public class FullCourseController {

    private final FullCourseService fullCourseService;
    private final ScheduleService scheduleService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createFullCourse(@RequestBody FullCourseReq req) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(fullCourseService.createFullCourse(req, username));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<FullCourseListRes>> getPopularFullCourseList() {
        return ResponseEntity.ok(fullCourseService.getPopularFullCourseList());
    }

    @GetMapping("/{fullCourseId}")
    public ResponseEntity<FullCourseRes> getFullCourse(@PathVariable Long fullCourseId) {
        return ResponseEntity.ok(fullCourseService.getFullCourse(fullCourseId));
    }

    @PostMapping("/{fullCourseId}/place")
    public ResponseEntity<Map<String, Long>> addPlaceSchedule(@PathVariable Long fullCourseId , @RequestBody PlaceScheduleReq req) {
        return ResponseEntity.ok(scheduleService.addPlaceSchedule(req, fullCourseId));
    }

    @PostMapping("/{fullCourseId}/customPlace")
    public ResponseEntity<Map<String, Long>> addCustomPlaceSchedule(@PathVariable Long fullCourseId, @RequestBody CustomPlaceScheduleReq req) {
        return ResponseEntity.ok(scheduleService.addCustomPlaceSchedule(req, fullCourseId));
    }

    @DeleteMapping("/{fullCourseId}")
    public ResponseEntity<String> deleteFullCourse(@PathVariable Long fullCourseId) {
        fullCourseService.deleteFullCourse(fullCourseId);
        return ResponseEntity.ok("풀코스가 삭제되었습니다.");
    }

    @PostMapping("/{fullCourseId}/like")
    public ResponseEntity<Map<String, Boolean>> likeFullCourse(@PathVariable Long fullCourseId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(fullCourseService.likeFullCourse(fullCourseId, username));
    }

    @GetMapping("/{fullCourseId}/like")
    public ResponseEntity<Map<String, Boolean>> getLikeFullCourse(@PathVariable Long fullCourseId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(fullCourseService.getLikeFullCourse(fullCourseId, username));
    }
}

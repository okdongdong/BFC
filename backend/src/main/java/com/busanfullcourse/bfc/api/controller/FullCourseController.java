package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.service.FullCourseService;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/fullCourse")
@RequiredArgsConstructor
public class FullCourseController {

    private final FullCourseService fullCourseService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createFullCourse(@RequestBody FullCourseReq req) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(fullCourseService.createFullCourse(req, username));
    }

    @GetMapping("/{fullCourseId}")
    public ResponseEntity<FullCourseRes> getFullCourse(@PathVariable Long fullCourseId) {
        return ResponseEntity.ok(fullCourseService.getFullCourse(fullCourseId));
    }

    @PostMapping("/{fullCourseId}")
    public void addSchedule(@PathVariable Long fullCourseId) {

    }

}

package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.response.FullCourseListRes;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.response.SharingRes;
import com.busanfullcourse.bfc.api.service.FullCourseService;
import com.busanfullcourse.bfc.api.service.ShareService;
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
    private final ShareService shareService;
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

    @PostMapping("/{fullCourseId}/share")
    public ResponseEntity<String> shareFullCourse(
            @RequestParam Long fullCourseId,
            @RequestParam String email) throws IllegalAccessException {
        shareService.shareFullCourse(fullCourseId, email);
        return ResponseEntity.ok("풀코스가 공유되었습니다.");
    }

    @GetMapping("/{fullCourseId}/share")
    public ResponseEntity<List<SharingRes>> getShareMember(@PathVariable Long fullCourseId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(shareService.getShareMember(fullCourseId, username));
    }

    @DeleteMapping("/{fullCourseId}/share")
    public ResponseEntity<String> deleteShareMember(@PathVariable Long fullCourseId, @RequestBody Map<String, Long> map) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        shareService.deleteShareMember(fullCourseId, username, map);
        return ResponseEntity.ok("멤버가 제외되었습니다.");
    }
}

package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.FullCourseReq;
import com.busanfullcourse.bfc.api.request.FullCourseUpdateReq;
import com.busanfullcourse.bfc.api.response.FullCourseListRes;
import com.busanfullcourse.bfc.api.response.FullCourseRes;
import com.busanfullcourse.bfc.api.response.PlaceListRes;
import com.busanfullcourse.bfc.api.response.SharingRes;
import com.busanfullcourse.bfc.api.service.FullCourseService;
import com.busanfullcourse.bfc.api.service.PlaceService;
import com.busanfullcourse.bfc.api.service.ShareService;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
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
    private final PlaceService placeService;

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
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(fullCourseService.getFullCourse(fullCourseId, username));
    }

    @PutMapping("/{fullCourseId}/date")
    public ResponseEntity<String> changeFullCourseDate(@PathVariable Long fullCourseId,
                                                       @RequestBody FullCourseUpdateReq fullCourseUpdateReq) {
        fullCourseService.changeFullCourseDate(fullCourseId, fullCourseUpdateReq);
        return ResponseEntity.ok("풀코스가 변경되었습니다.");
    }

    @PutMapping("/{fullCourseId}/public")
    public ResponseEntity<String> changeFullCoursePublic(@PathVariable Long fullCourseId,
                                                       @RequestBody Map<String, Boolean> isPublic) {
        fullCourseService.changeFullCoursePublic(fullCourseId, isPublic);
        return ResponseEntity.ok("풀코스가 변경되었습니다.");
    }

    @PutMapping("/{fullCourseId}/review")
    public ResponseEntity<String> changeFullCourseReview(@PathVariable Long fullCourseId,
                                                       @RequestBody Map<String, String> review) {
        fullCourseService.changeFullCourseReview(fullCourseId, review);
        return ResponseEntity.ok("풀코스가 변경되었습니다.");
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
            @PathVariable Long fullCourseId,
            @RequestParam String email) {
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

    @GetMapping("/{fullCourseId}/surveyRecommend")
    public ResponseEntity<Page<PlaceListRes>> getSurveyRecommendPlaceList(
            @PathVariable Long fullCourseId,
            @PageableDefault(size = 8)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "category", direction = Sort.Direction.ASC),
                    @SortDefault(sort = "scoreCount", direction = Sort.Direction.DESC)
            })Pageable pageable
    ) {
        return ResponseEntity.ok(placeService.getSurveyRecommendPlaceList(fullCourseId, pageable));
    }
}

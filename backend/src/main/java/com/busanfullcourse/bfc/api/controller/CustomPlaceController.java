package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.CustomPlaceUpdateReq;
import com.busanfullcourse.bfc.api.response.CustomPlaceListRes;
import com.busanfullcourse.bfc.api.service.CustomPlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customPlace")
@RequiredArgsConstructor
public class CustomPlaceController {

    private final CustomPlaceService customPlaceService;


    @PostMapping
    public ResponseEntity<String> createCustomPlace(@RequestBody CustomPlaceUpdateReq req) {
        customPlaceService.createCustomPlace(req);
        return ResponseEntity.ok("나만의 장소가 생성되었습니다.");
    }

    @GetMapping
    public ResponseEntity<Page<CustomPlaceListRes>> getCustomPlaceList(
            @RequestParam Long userId,
            @PageableDefault(size = 5, sort = "customPlaceId", direction = Sort.Direction.DESC) Pageable pageable) {
            return ResponseEntity.ok(CustomPlaceListRes.of(customPlaceService.getCustomPlaceListByUserId(userId, pageable)));
    }

    @PutMapping("/{customPlaceId}")
    public ResponseEntity<String> updateCustomPlace(@RequestBody CustomPlaceUpdateReq req, @PathVariable Long customPlaceId) {
        customPlaceService.updateCustomPlace(req, customPlaceId);
        return ResponseEntity.ok("나만의 장소가 수정되었습니다.");
    }

    @DeleteMapping("/{customPlaceId}")
    public ResponseEntity<String> deleteCustomPlace(@PathVariable Long customPlaceId) {
        customPlaceService.deleteCustomPlace(customPlaceId);
        return ResponseEntity.ok("나만의 장소가 삭제되었습니다.");
    }
}

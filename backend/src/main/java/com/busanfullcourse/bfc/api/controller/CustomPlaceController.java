package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.CustomPlaceUpdateReq;
import com.busanfullcourse.bfc.api.response.CustomPlaceListRes;
import com.busanfullcourse.bfc.api.service.CustomPlaceService;
import com.busanfullcourse.bfc.api.service.UserService;
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
    private final UserService userService;

    @PostMapping
    public ResponseEntity<String> createCustomPlace(@RequestBody CustomPlaceUpdateReq req) {
        String username = userService.getCurrentUsername();
        customPlaceService.createCustomPlace(req, username);
        return ResponseEntity.ok("나만의 장소가 생성되었습니다.");
    }

    @GetMapping
    public ResponseEntity<Page<CustomPlaceListRes>> getCustomPlaceList(
            @PageableDefault(size = 5, sort = "customPlaceId", direction = Sort.Direction.DESC) Pageable pageable) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(CustomPlaceListRes.of(customPlaceService.getCustomPlaceListByUserId(username, pageable)));
    }

    @PutMapping("/{customPlaceId}")
    public ResponseEntity<String> updateCustomPlace(@RequestBody CustomPlaceUpdateReq req, @PathVariable Long customPlaceId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        customPlaceService.updateCustomPlace(req, customPlaceId, username);
        return ResponseEntity.ok("나만의 장소가 수정되었습니다.");
    }

    @DeleteMapping("/{customPlaceId}")
    public ResponseEntity<String> deleteCustomPlace(@PathVariable Long customPlaceId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        customPlaceService.deleteCustomPlace(customPlaceId, username);
        return ResponseEntity.ok("나만의 장소가 삭제되었습니다.");
    }
}

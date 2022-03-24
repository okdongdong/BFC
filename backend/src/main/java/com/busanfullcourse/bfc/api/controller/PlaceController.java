package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.ScoreReq;
import com.busanfullcourse.bfc.api.response.AttractionDetailRes;
import com.busanfullcourse.bfc.api.response.RestaurantDetailRes;
import com.busanfullcourse.bfc.api.response.ScoreRes;
import com.busanfullcourse.bfc.api.service.PlaceService;
import com.busanfullcourse.bfc.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final ScoreService scoreService;

    @GetMapping("/restaurant/{placeId}")
    public ResponseEntity<RestaurantDetailRes> getRestaurantDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getRestaurantDetail(placeId));
    }

    @GetMapping("/attraction/{placeId}")
    public ResponseEntity<AttractionDetailRes> getAttractionDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getAttractionDetail(placeId));
    }

    @PostMapping("/{placeId}/score")
    public ResponseEntity<String> setPlaceScore(@PathVariable Long placeId, @RequestBody ScoreReq req) {
        scoreService.setPlaceScore(placeId, req.getUserId(), req.getScore());
        return ResponseEntity.ok("점수가 등록되었습니다.");
    }

    @GetMapping("/{placeId}/score")
    public ResponseEntity<ScoreRes> getPlaceScore(@PathVariable Long placeId, @RequestParam Long userId) {
        return ResponseEntity.ok(scoreService.getPlaceScore(placeId, userId));
    }

    @PutMapping("/{placeId}/score")
    public ResponseEntity<String> updatePlaceScore(@PathVariable Long placeId, @RequestBody ScoreReq req) {
        scoreService.updatePlaceScore(placeId, req.getUserId(), req.getScore());
        return ResponseEntity.ok("점수가 수정되었습니다.");
    }

    @DeleteMapping("/{placeId}/score")
    public ResponseEntity<String> deletePlaceScore(@PathVariable Long placeId, @RequestParam Long userId) {
        scoreService.deletePlaceScore(placeId, userId);
        return ResponseEntity.ok("점수가 삭제되었습니다.");
    }
}

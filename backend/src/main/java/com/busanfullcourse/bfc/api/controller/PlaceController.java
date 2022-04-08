package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.ScoreReq;
import com.busanfullcourse.bfc.api.response.*;
import com.busanfullcourse.bfc.api.service.*;
import com.busanfullcourse.bfc.db.entity.Place;
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
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final ScoreService scoreService;
    private final UserService userService;
    private final InterestService interestService;
    private final ElasticSearchService searchService;

    @GetMapping("/{placeId}")
    public ResponseEntity<PlaceDetailRes> getPlaceDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getPlaceDetail(placeId));
    }


    @GetMapping("/restaurant/popular")
    public ResponseEntity<List<PlaceListRes>> getPopularRestaurantList() {
        return ResponseEntity.ok(placeService.getPopularRestaurantList());
    }

    @GetMapping("/attraction/popular")
    public ResponseEntity<List<PlaceListRes>> getPopularAttractionList() {
        return ResponseEntity.ok(placeService.getPopularAttractionList());
    }

    @GetMapping("/restaurant/mainRecommend")
    public ResponseEntity<List<PlaceListRes>> getMainRecommendRestaurantList() {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(placeService.getMainRecommendRestaurantList(username));
    }

    @GetMapping("/attraction/mainRecommend")
    public ResponseEntity<List<PlaceListRes>> getMainRecommendAttractionList() {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(placeService.getMainRecommendAttractionList(username));
    }

    @GetMapping("/restaurant/recommend")
    public ResponseEntity<List<PlaceListRes>> getRecommendRestaurantList() {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(placeService.getRecommendRestaurantList(username));
    }


    @GetMapping("/attraction/recommend")
    public ResponseEntity<List<PlaceListRes>> getRecommendAttractionList() {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(placeService.getRecommendAttractionList(username));
    }

    @PostMapping("/{placeId}/score")
    public ResponseEntity<String> setPlaceScore(@PathVariable Long placeId, @RequestBody ScoreReq req) {
        String username = userService.getCurrentUsername();
        scoreService.setPlaceScore(placeId, username, req.getScore());
        return ResponseEntity.ok("점수가 등록되었습니다.");
    }

    @GetMapping("/{placeId}/score")
    public ResponseEntity<ScoreRes> getPlaceScore(@PathVariable Long placeId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(scoreService.getPlaceScore(placeId, username));
    }

    @PutMapping("/{placeId}/score")
    public ResponseEntity<String> updatePlaceScore(@PathVariable Long placeId, @RequestBody ScoreReq req) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        scoreService.updatePlaceScore(placeId, username, req.getScore());
        return ResponseEntity.ok("점수가 수정되었습니다.");
    }

    @DeleteMapping("/{placeId}/score")
    public ResponseEntity<String> deletePlaceScore(@PathVariable Long placeId) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        scoreService.deletePlaceScore(placeId, username);
        return ResponseEntity.ok("점수가 삭제되었습니다.");
    }

    @PostMapping("/{placeId}/interest")
    public ResponseEntity<Map<String,Boolean>> updatePlaceInterest(@PathVariable Long placeId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(interestService.updatePlaceInterest(placeId, username));
    }

    @GetMapping("/{placeId}/interest")
    public ResponseEntity<Map<String, Boolean>> getPlaceInterest(@PathVariable Long placeId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(interestService.getPlaceInterest(placeId, username));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PlaceListRes>> searchPlace(@RequestParam String name,
                                         @PageableDefault(size = 8)
                                                 @SortDefault.SortDefaults({
                                                         @SortDefault(sort = "category", direction = Sort.Direction.ASC),
                                                         @SortDefault(sort = "scoreCount", direction = Sort.Direction.DESC)
                                                 })
                                                 Pageable pageable) {
        return ResponseEntity.ok(searchService.searchPlaceByName(name, pageable));
    }
    @GetMapping("/search2")
    public ResponseEntity<Page<Place>> searchPlaceByJPA(@RequestParam String name,
                                                  @PageableDefault(size = 8)
                                                  @SortDefault.SortDefaults({
                                                          @SortDefault(sort = "category", direction = Sort.Direction.ASC),
                                                          @SortDefault(sort = "scoreCount", direction = Sort.Direction.DESC)
                                                  })
                                                          Pageable pageable) {
        return ResponseEntity.ok(searchService.searchPlaceByNameByJPA(name, pageable));
    }

    @GetMapping("/search/test")
    public ResponseEntity<Page<Place>> searchAll(@PageableDefault(size = 8, sort = "placeId", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(searchService.searchAll(pageable));
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveAll() {
        searchService.saveAll();
        return ResponseEntity.ok("성공적으로 저장되었습니다.");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteAll() {
        searchService.deleteAll();
        return ResponseEntity.ok("성공적으로 삭제되었습니다.");
    }

    @GetMapping("/search/near")
    public ResponseEntity<Page<PlaceListRes>> searchByDistance(
            @RequestParam Long scheduleId,
            @RequestParam Integer distance,
            @PageableDefault(size = 8)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "category", direction = Sort.Direction.ASC),
                    @SortDefault(sort = "scoreCount", direction = Sort.Direction.DESC)
            }) Pageable pageable
            ) {
        return ResponseEntity.ok(searchService.searchByDistance(scheduleId, distance, pageable));
    }

    @GetMapping("/recommend")
    public ResponseEntity<Page<PlaceListRes>> getRecommendPlaceList(
            @PageableDefault(size = 8)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "place.category", direction = Sort.Direction.ASC),
                    @SortDefault(sort = "place.scoreCount", direction = Sort.Direction.DESC)
            }) Pageable pageable
    ) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(placeService.getRecommendPlaceList(username, pageable));
    }
}

package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.response.RestaurantRes;
import com.busanfullcourse.bfc.api.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;

    @GetMapping("/restaurant/{placeId}")
    public ResponseEntity<RestaurantRes> getRestaurantDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getRestaurantDetail(placeId));
    }
}

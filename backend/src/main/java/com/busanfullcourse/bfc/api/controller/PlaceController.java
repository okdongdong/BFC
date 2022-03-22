package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.response.AttractionDetailRes;
import com.busanfullcourse.bfc.api.response.RestaurantDetailRes;
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
    public ResponseEntity<RestaurantDetailRes> getRestaurantDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getRestaurantDetail(placeId));
    }

    @GetMapping("/attraction/{placeId}")
    public ResponseEntity<AttractionDetailRes> getAttractionDetail(@PathVariable Long placeId) {
        return ResponseEntity.ok(placeService.getAttractionDetail(placeId));
    }
}

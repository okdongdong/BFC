package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.response.UserProfileRes;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{nickname}/profile")
    public ResponseEntity<UserProfileRes> getUserProfile(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.getUserProfile(nickname));
    }
}

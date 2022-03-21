package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.ChangePasswordReq;
import com.busanfullcourse.bfc.api.request.UserDeleteReq;
import com.busanfullcourse.bfc.api.request.UserUpdateReq;
import com.busanfullcourse.bfc.api.response.MyInfoRes;
import com.busanfullcourse.bfc.api.response.UserProfileRes;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{nickname}/profile")
    public ResponseEntity<UserProfileRes> getUserProfile(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.getUserProfile(nickname));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<MyInfoRes> getMyInfo(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getMyInfo(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateMyInfo(@PathVariable Long userId, @RequestBody UserUpdateReq userUpdateReq){
        userService.updateMyInfo(userUpdateReq, userId);
        return ResponseEntity.ok("회원정보가 수정되었습니다.");
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordReq changePasswordReq, @PathVariable Long userId){
        userService.changePassword(changePasswordReq, userId);
        return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@RequestBody UserDeleteReq userDeleteReq, @PathVariable Long userId) {
        userService.deleteUser(userDeleteReq, userId);
        return ResponseEntity.ok("회원탈퇴가 정상적으로 처리되었습니다.");
    }

    @PostMapping("/{userId}/profile")
    public ResponseEntity<UserProfileRes> updateProfileImg(@PathVariable Long userId, @RequestParam MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.updateProfileImg(userId, file));
    }

}

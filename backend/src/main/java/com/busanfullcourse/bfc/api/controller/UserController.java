package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.ChangePasswordReq;
import com.busanfullcourse.bfc.api.request.UserDeleteReq;
import com.busanfullcourse.bfc.api.request.UserUpdateReq;
import com.busanfullcourse.bfc.api.response.*;
import com.busanfullcourse.bfc.api.service.InterestService;
import com.busanfullcourse.bfc.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final InterestService interestService;

    @GetMapping("/{nickname}/profile")
    public ResponseEntity<UserProfileRes> getUserProfile(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.getUserProfile(nickname));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<MyInfoRes> getMyInfo(@PathVariable Long userId) throws IllegalAccessException {
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
    public ResponseEntity<UserProfileRes> updateProfileImg(@PathVariable Long userId, @RequestParam MultipartFile file) throws IOException, IllegalAccessException {
        return ResponseEntity.ok(userService.updateProfileImg(userId, file));
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<FollowRes> follow(@PathVariable Long userId) throws IllegalAccessException {
        return ResponseEntity.ok(userService.follow(userId));
    }

    @GetMapping("/{userId}/followFrom")
    public ResponseEntity<List<FollowListRes>> followFromList(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.followFromList(userId));
    }

    @GetMapping("/{userId}/followTo")
    public ResponseEntity<List<FollowListRes>> followToList(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.followToList(userId));
    }

    @GetMapping("/{userId}/interest")
    public ResponseEntity<Page<InterestListRes>>  getMoreInterestPlace(@PathVariable Long userId,
                                                                       @PageableDefault(size = 8, sort = "interestId", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(interestService.getMoreInterestPlace(userId, pageable));
    }

    @GetMapping("/{userId}/userFullCourse")
    public ResponseEntity<Page<FullCourseListRes>> getMoreUserFullCourse(@PathVariable Long userId,
                                                                         @PageableDefault(size = 8, sort = "startedOn", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(userService.getMoreUserFullCourse(userId, pageable));
    }

    @GetMapping("/{userId}/likedFullCourse")
    public ResponseEntity<Page<FullCourseListRes>> getMoreLikedFullCourse(@PathVariable Long userId,
                                                                          @PageableDefault(size = 8, sort = "likeId", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(userService.getMoreLikedFullCourse(userId, pageable));
    }


}

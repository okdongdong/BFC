package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.request.LoginReq;
import com.busanfullcourse.bfc.api.request.SignUpReq;
import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.api.response.LoginRes;
import com.busanfullcourse.bfc.api.response.MyInfoRes;
import com.busanfullcourse.bfc.api.response.TokenRes;
import com.busanfullcourse.bfc.api.service.EmailService;
import com.busanfullcourse.bfc.api.service.UserService;
import com.busanfullcourse.bfc.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpReq signUpReq) {
        userService.signup(signUpReq);
        return ResponseEntity.ok("회원 가입 완료");
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<String> signupAdmin(@RequestBody SignUpReq signUpReq) {
        userService.signupAdmin(signUpReq);
        return ResponseEntity.ok("어드민 회원 가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginRes> login(@RequestBody LoginReq loginReq) {
        TokenRes tokenRes = userService.login(loginReq);
        MyInfoRes myInfoRes = userService.getMyInfo(loginReq.getUsername());
        return ResponseEntity.ok(LoginRes.of(tokenRes,myInfoRes));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenRes> reissue(@RequestHeader("RefreshToken") String refreshToken) {
        return ResponseEntity.ok(userService.reissue(refreshToken));
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String accessToken,
                       @RequestHeader("RefreshToken") String refreshToken) {
        String username = jwtTokenUtil.getUsername(resolveToken(accessToken));
        userService.logout(TokenRes.of(accessToken, refreshToken), username);
    }

    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

    @GetMapping("/nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkNickname(nickname));
    }

    @PostMapping("/verification")
    public ResponseEntity<String> emailPasswordAuth(
            @RequestBody Map<String, String> email
    ) throws Exception {
        emailService.sendResetCode(email.get("email"));
        return ResponseEntity.ok("비밀번호가 메일로 발송되었습니다.");
    }

}

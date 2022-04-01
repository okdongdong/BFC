package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.api.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/verification")
    public ResponseEntity<EmailAuthRes> emailAuth(
            @RequestBody
            Map<String, String> email
    ) throws Exception {
        return ResponseEntity.ok(emailService.sendCode(email.get("email")));
    }

    @PostMapping("/verification/reset")
    public ResponseEntity<EmailAuthRes> emailPasswordAuth(
            @RequestBody
            Map<String, String> email
    ) throws Exception {
        return ResponseEntity.ok(emailService.sendResetCode(email.get("email")));
    }

    @PostMapping("/{fullCourseId}/share")
    public ResponseEntity<String> shareFullCourse(
            @PathVariable Long fullCourseId,
            @RequestBody Map<String, String> invitedUser) throws IllegalAccessException {
        emailService.shareFullCourse(fullCourseId, invitedUser);
        return ResponseEntity.ok("초대메일이 발송되었습니다.");
    }
}

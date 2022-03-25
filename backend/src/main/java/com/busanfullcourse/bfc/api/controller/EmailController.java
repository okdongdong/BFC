package com.busanfullcourse.bfc.api.controller;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.api.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    private Boolean checkUsername(String username) {
        // 비어있으면 true, 객체가 찾아지면 false.
        return userRepository.findByUsername(username).isEmpty();
    }

    private MimeMessage createMessage(String to, String code) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Code: " + code);

        String message = "";
        message += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 주소 확인</h1>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 BusanFullCourse 가입 창이 있는 브라우저 창에 입력하세요.</p>";
        message += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        message += code;
        message += "</td></tr></tbody></table></div>";
        message += "<a href=\"https://slack.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">BFC Technologies, Inc</a>";

        mimeMessage.setText(message, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("busanfullcourse@gmail.com", "busanfullcourse"));

        return mimeMessage;
    }

    public static String createKey() {
        StringBuffer code = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 6자리
            code.append((random.nextInt(10)));
        }
        return code.toString();
    }

    public EmailAuthRes sendCode(String email) throws Exception{
        if (!checkUsername(email)) {
            throw new IllegalArgumentException();
        }
        String code = createKey();
        MimeMessage message = createMessage(email, code);
        try {
            javaMailSender.send(message);
        } catch (MailException mailException) {
            mailException.printStackTrace();
            throw new IllegalArgumentException();
        }

        return EmailAuthRes.builder().code(code).build();
    }
}

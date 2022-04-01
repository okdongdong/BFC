package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Sharing;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.FullCourseRepository;
import com.busanfullcourse.bfc.db.repository.SharingRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final UserService userService;
    private final FullCourseRepository fullCourseRepository;
    private final SharingRepository sharingRepository;


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

    private MimeMessage createShareMessage(String to, Long fullCourseId) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Share!!");
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

    public EmailAuthRes sendResetCode(String email) throws Exception{
        if (checkUsername(email)) {
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

    public void shareFullCourse(Long fullCourseId, Map<String, String> invitedUser) throws IllegalAccessException {
        String username = userService.getCurrentUsername();
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 공유할 수 있습니다.");
        }
        String email = invitedUser.get("invitedUser");
        User reqUser = userRepository.findByUsername(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        Optional<Sharing> optionalSharing = sharingRepository.findByFullCourseAndUser(fullCourse, reqUser);

        if (optionalSharing.isEmpty()) {
            Sharing sharing = sharingRepository.save(Sharing.builder()
                    .fullCourse(fullCourse)
                    .user(reqUser)
                    .build());
        } else {
            throw new IllegalAccessException("이미 공유된 사용자입니다.");
        }
    }
}

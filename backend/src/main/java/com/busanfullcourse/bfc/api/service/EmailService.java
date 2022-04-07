package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입할 때 전송하는 메일
    public EmailAuthRes sendCodeToNotUser(String email) throws Exception{
        if (userRepository.findByUsername(email).isPresent()) {
            throw new IllegalArgumentException(ExceptionUtil.USER_NOT_FOUND);
        }
        String code = sendCode(email);
        return EmailAuthRes.builder().code(code).build();
    }

    // 비밀번호 찾으려는 사용자에게 본인인지 코드 확인
    public EmailAuthRes sendCodeToUser(String email) throws Exception{
        if (userRepository.findByUsername(email).isEmpty()) {
            throw new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND);
        }
        String code = sendCode(email);
        return EmailAuthRes.builder().code(code).build();
    }

    public String sendCode(String email) throws Exception {
        String code;
        Random random = SecureRandom.getInstanceStrong();
        code = IntStream.range(0, 8).mapToObj(i -> String.valueOf((random.nextInt(10)))).collect(Collectors.joining());

        MimeMessage message = createNewMessage(email, code, "가입 확인 코드",
                "아래 확인 코드를 BusanFullCourse 가입 창이 있는 브라우저 창에 입력하세요.");
        try {
            javaMailSender.send(message);
        } catch (MailException mailException) {
            throw new NoSuchElementException(ExceptionUtil.EMAIL_NOT_FOUND);
        }
        return code;
    }

    // 초기화된 비밀번호 전송
    public void sendResetCode(String email) throws Exception{
        User user = userRepository.findByUsername(email)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        String newPassword = createPassword();

        MimeMessage message = createNewMessage(email, newPassword, "비밀번호 변경 안내",
                "Busan Full Course 계정 비밀번호가 아래와 같이 갱신되었습니다.");
        try {
            javaMailSender.send(message);
        } catch (MailException mailException) {
            throw new NoSuchElementException(ExceptionUtil.EMAIL_NOT_FOUND);
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private MimeMessage createNewMessage(String to, String code, String title, String content) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Code: " + code);

        String message = "";
        message += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">" + title + "</h1>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">" + content + "</p>";
        message += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 15px  40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        message += code;
        message += "</td></tr></tbody></table></div>";
        message += "<a href=\"https://slack.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">BFC Technologies, Inc</a>";

        mimeMessage.setText(message, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("busanfullcourse@gmail.com", "busanfullcourse"));

        return mimeMessage;
    }

    public static String createPassword() throws Exception {
        StringBuffer temp = new StringBuffer();
        Random rnd = SecureRandom.getInstanceStrong();
        for (int i = 0; i < 16; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
                case 0:
                    // a-z
                    temp.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    // A-Z
                    temp.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    // 0-9
                    temp.append((rnd.nextInt(10)));
                    break;
            }
        }
        return temp.toString();
    }


    /*
    // 풀코스를 공유하기 위한 service
    public void shareFullCourse(Long fullCourseId, Map<String, String> invitedUser) throws Exception {
        String username = userService.getCurrentUsername();
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.FULL_COURSE_NOT_FOUND));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException(ExceptionUtil.UNAUTHORIZED_USER);
        }
        String email = invitedUser.get("invitedUser");
        User reqUser = userRepository.findByUsername(email)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));
        if (sharingRepository.findByFullCourseAndUser(fullCourse, reqUser).isPresent()) {
            throw new IllegalAccessException(ExceptionUtil.SHARE_DUPLICATE);
        } else {
            MimeMessage message = createShareMessage(email, fullCourse);
            try {
                javaMailSender.send(message);
            } catch (MailException mailException) {
                throw new NoSuchElementException(ExceptionUtil.EMAIL_NOT_FOUND);
            }
        }
    }
     */

    /*
    // 공유 메세지를 만드는 함수
    private MimeMessage createShareMessage(String to, FullCourse fullCourse) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Share!!");

        String message = "";
        message += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">같이 여행가요!</h1>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">";
        message += fullCourse.getTitle();
        message += "의 부산여행 풀코스로 모시겠습니다!</p>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">확인버튼을 통해 풀코스에 참여하세요!</p>";
        mimeMessage.setText(message, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("busanfullcourse@gmail.com", "busanfullcourse"));
        return mimeMessage;
    }
     */
}

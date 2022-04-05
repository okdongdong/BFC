package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.EmailAuthRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.FullCourseRepository;
import com.busanfullcourse.bfc.db.repository.SharingRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final UserService userService;
    private final FullCourseRepository fullCourseRepository;
    private final SharingRepository sharingRepository;
    private final PasswordEncoder passwordEncoder;


    private Boolean checkUsername(String username) {
        // 비어있으면 true, 객체가 찾아지면 false.
        return userRepository.findByUsername(username).isEmpty();
    }

    private MimeMessage createMessage(String to, String code) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Code: " + code);

        String message = "";
        message += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">가입 확인 코드</h1>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 BusanFullCourse 가입 창이 있는 브라우저 창에 입력하세요.</p>";
        message += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 15px  40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        message += code;
        message += "</td></tr></tbody></table></div>";
        message += "<a href=\"https://slack.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">BFC Technologies, Inc</a>";

        mimeMessage.setText(message, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("busanfullcourse@gmail.com", "busanfullcourse"));

        return mimeMessage;
    }

    private MimeMessage createNewPasswordMessage(String to, String code) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        mimeMessage.addRecipients(Message.RecipientType.TO, to);
        mimeMessage.setSubject("BusanFullCourse Code: " + code);

        String message = "";
        message += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">비밀번호 변경 안내</h1>";
        message += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">Busan Full Course 계정 비밀번호가 아래와 같이 갱신되었습니다.</p>";
        message += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 15px  40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        message += code;
        message += "</td></tr></tbody></table></div>";
        message += "<a href=\"https://slack.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">BFC Technologies, Inc</a>";

        mimeMessage.setText(message, "utf-8", "html");
        mimeMessage.setFrom(new InternetAddress("busanfullcourse@gmail.com", "busanfullcourse"));

        return mimeMessage;
    }

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

    public static String createKey() {
        StringBuffer code = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 6자리
            code.append((random.nextInt(10)));
        }
        return code.toString();
    }

    public static String createPassword() {
        StringBuffer temp = new StringBuffer();
        Random rnd = new Random();
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

    public EmailAuthRes sendCodeToUser(String email) throws Exception{
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

    public void sendResetCode(String email) throws Exception{
        User user = userRepository.findByUsername(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        String newPassword = createPassword();
        MimeMessage message = createNewPasswordMessage(email, newPassword);
        try {
            javaMailSender.send(message);
        } catch (MailException mailException) {
            mailException.printStackTrace();
            throw new IllegalArgumentException();
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void shareFullCourse(Long fullCourseId, Map<String, String> invitedUser) throws Exception {
        String username = userService.getCurrentUsername();
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NoFullCourse));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 공유할 수 있습니다.");
        }
        String email = invitedUser.get("invitedUser");
        User reqUser = userRepository.findByUsername(email).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NoUser));
        if (sharingRepository.findByFullCourseAndUser(fullCourse, reqUser).isPresent()) {
            throw new IllegalAccessException("이미 공유된 사용자입니다.");
        } else {
            MimeMessage message = createShareMessage(email, fullCourse);
            try {
                javaMailSender.send(message);
            } catch (MailException mailException) {
                mailException.printStackTrace();
                throw new IllegalArgumentException();
            }
        }


    }
}

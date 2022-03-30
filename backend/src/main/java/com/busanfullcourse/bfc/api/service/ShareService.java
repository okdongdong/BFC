package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.response.SharingListRes;
import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Sharing;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.FullCourseRepository;
import com.busanfullcourse.bfc.db.repository.SharingRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ShareService {

    private final UserRepository userRepository;
    private final SharingRepository sharingRepository;
    private final FullCourseRepository fullCourseRepository;

    public List<SharingListRes> shareFullCourse(Long fullCourseId, String username, List<String> userList) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 공유할 수 있습니다.");
        }

        for (String name : userList) {
            User user = userRepository.findByUsername(name).orElseThrow(() -> new NoSuchElementException("회원을 찾을 수 없습니다."));
            Optional<Sharing> optionalSharing = sharingRepository.findByFullCourseAndUser(fullCourse, user);
            if (optionalSharing.isEmpty()) {
                sharingRepository.save(Sharing.builder()
                                .fullCourse(fullCourse)
                                .user(user)
                        .build());
            }
        }

        List<Sharing> sharings = fullCourse.getSharings();
//            List<Sharing> sharings = sharingRepository.findAllByFullCourse(fullCourse);

        return SharingListRes.of(sharings);
    }

    public List<SharingListRes> getShareMember(Long fullCourseId, String username) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 조회할 수 있습니다.");
        }

        return SharingListRes.of(sharingRepository.findAllByFullCourseFullCourseId(fullCourseId));
    }

    public void deleteShareMember(Long fullCourseId, String username, Map<String, Long> map) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException("풀코스가 없습니다."));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 수정할 수 있습니다.");
        }

        sharingRepository.deleteById(sharingRepository.findByUserId(map.get("bannedMember")).getSharingId());
    }
}

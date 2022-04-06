package com.busanfullcourse.bfc.api.service;


import com.busanfullcourse.bfc.api.response.SharingRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
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

    public void shareFullCourse(Long fullCourseId, String email) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        Optional<User> user = userRepository.findByUsername(email);
        if (user.isEmpty()) {
            throw new NoSuchElementException(ExceptionUtil.NO_USER);
        }

        Optional<Sharing> sharing = sharingRepository.findByFullCourseAndUser(fullCourse, user.get());
        if (sharing.isPresent()) {
            throw new IllegalAccessException("이미 공유된 사용자입니다.");
        } else {
            sharingRepository.save(Sharing.builder()
                    .fullCourse(fullCourse)
                    .user(user.get())
                    .build());
        }
    }

    public List<SharingRes> getShareMember(Long fullCourseId, String username) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 조회할 수 있습니다.");
        }

        return SharingRes.of(sharingRepository.findAllByFullCourseFullCourseId(fullCourseId));
    }

    public void deleteShareMember(Long fullCourseId, String username, Map<String, Long> map) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_FULL_COURSE));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("풀코스의 주인만 수정할 수 있습니다.");
        }

        sharingRepository.deleteById(sharingRepository.findByUserId(map.get("bannedMember")).getSharingId());
    }
}

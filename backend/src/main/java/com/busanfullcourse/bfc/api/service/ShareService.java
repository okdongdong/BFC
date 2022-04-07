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

    public void shareFullCourse(Long fullCourseId, String email) {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.FULL_COURSE_NOT_FOUND));
        Optional<User> user = userRepository.findByUsername(email);
        if (user.isEmpty()) {
            throw new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND);
        }

        Optional<Sharing> sharing = sharingRepository.findByFullCourseAndUser(fullCourse, user.get());
        if (sharing.isPresent()) {
            throw new DuplicateFormatFlagsException(ExceptionUtil.SHARE_DUPLICATE);
        } else {
            sharingRepository.save(Sharing.builder()
                    .fullCourse(fullCourse)
                    .user(user.get())
                    .build());
        }
    }

    public List<SharingRes> getShareMember(Long fullCourseId, String username) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.FULL_COURSE_NOT_FOUND));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
        }

        return SharingRes.of(sharingRepository.findAllByFullCourseFullCourseId(fullCourseId));
    }

    public void deleteShareMember(Long fullCourseId, String username, Map<String, Long> map) throws IllegalAccessException {
        FullCourse fullCourse = fullCourseRepository.findById(fullCourseId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.FULL_COURSE_NOT_FOUND));
        if (!fullCourse.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
        }

        sharingRepository.deleteById(sharingRepository.findByUserId(map.get("bannedMember")).getSharingId());
    }
}

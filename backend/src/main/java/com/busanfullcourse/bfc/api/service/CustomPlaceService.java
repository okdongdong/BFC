package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.request.CustomPlaceUpdateReq;
import com.busanfullcourse.bfc.db.entity.CustomPlace;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.CustomPlaceRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomPlaceService {

    private final CustomPlaceRepository customPlaceRepository;
    private final UserRepository userRepository;


    public void createCustomPlace(CustomPlaceUpdateReq req) {
        User user = userRepository.findById(req.getUserId()).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        customPlaceRepository.save(
                CustomPlace.builder()
                        .name(req.getName())
                        .address(req.getAddress())
                        .lat(req.getLat())
                        .lng(req.getLng())
                        .user(user)
                        .build()
        );
    }

    public Page<CustomPlace> getCustomPlaceListByUserId(Long userId, Pageable pageable) {
        return customPlaceRepository.findAllByUserId(userId, pageable);
    }

    public void updateCustomPlace(CustomPlaceUpdateReq req, Long customPlaceId) {
        CustomPlace customPlace = customPlaceRepository.findById(customPlaceId).orElseThrow(() -> new NoSuchElementException("나만의 장소가 없습니다."));

        customPlace.setAddress(req.getAddress());
        customPlace.setLat(req.getLat());
        customPlace.setLng(req.getLng());
        customPlace.setName(req.getName());
        customPlaceRepository.save(customPlace);

    }

    public void deleteCustomPlace(Long customPlaceId) {
        customPlaceRepository.deleteById(customPlaceId);
    }
}

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


    public void createCustomPlace(CustomPlaceUpdateReq req, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
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

    public Page<CustomPlace> getCustomPlaceListByUserId(String username, Pageable pageable) {
        return customPlaceRepository.findAllByUserUsername(username, pageable);
    }

    public void updateCustomPlace(CustomPlaceUpdateReq req, Long customPlaceId, String username) throws IllegalAccessException {
        CustomPlace customPlace = customPlaceRepository.findById(customPlaceId).orElseThrow(() -> new NoSuchElementException("나만의 장소가 없습니다."));
        if (!customPlace.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("본인이 아닙니다.");
        }
        customPlace.setAddress(req.getAddress());
        customPlace.setLat(req.getLat());
        customPlace.setLng(req.getLng());
        customPlace.setName(req.getName());
        customPlaceRepository.save(customPlace);

    }

    public void deleteCustomPlace(Long customPlaceId, String username) throws IllegalAccessException {
        CustomPlace customPlace = customPlaceRepository.findById(customPlaceId).orElseThrow(() -> new NoSuchElementException("나만의 장소가 없습니다."));
        if (!customPlace.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("본인이 아닙니다.");
        }
        customPlaceRepository.deleteById(customPlaceId);
    }
}

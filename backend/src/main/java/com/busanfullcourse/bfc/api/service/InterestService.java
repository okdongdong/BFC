package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.common.util.ExceptionUtil;
import com.busanfullcourse.bfc.db.entity.Interest;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.InterestRepository;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InterestService {

    private final InterestRepository interestRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private static final String INTEREST_KEY = "interested";

    public Map<String, Boolean> getPlaceInterest(Long placeId, String username) {
        Optional<Interest> interest = interestRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        HashMap<String, Boolean> map = new HashMap<>();
        map.put(INTEREST_KEY, interest.isPresent());
        return map;
    }

    public Map<String, Boolean> updatePlaceInterest(Long placeId, String username) {
        Optional<Interest> interest = interestRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_USER));
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException(ExceptionUtil.NO_PLACE));
        HashMap<String, Boolean> map = new HashMap<>();
        if (interest.isPresent()) {
            interestRepository.delete(interest.get());
            map.put(INTEREST_KEY, false);
        }else {
            interestRepository.save(Interest.builder()
                            .place(place)
                            .user(user)
                            .build());
            map.put(INTEREST_KEY, true);
        }
        return map;
    }

    public Page<Interest> getMoreInterestPlace(Long userId, Pageable pageable) {
        return interestRepository.findAllByUserId(userId, pageable);
    }
}

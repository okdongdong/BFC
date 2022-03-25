package com.busanfullcourse.bfc.api.service;

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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InterestService {

    private final InterestRepository interestRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    public Map<String, Boolean> getPlaceInterest(Long placeId, String username) {
        Optional<Interest> interest = interestRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        HashMap<String, Boolean> map = new HashMap<>();
        if (interest.isPresent()) {
            map.put("interested", true);
        }else {
            map.put("interested", false);
        }
        return map;
    }

    public Map<String, Boolean> updatePlaceInterest(Long placeId, String username) {
        Optional<Interest> interest = interestRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        Optional<User> user = userRepository.findByUsername(username);
        Optional<Place> place = placeRepository.findById(placeId);
        HashMap<String, Boolean> map = new HashMap<>();
        if (interest.isPresent()) {
            interestRepository.delete(interest.get());
            map.put("interested", false);
        }else {
            interestRepository.save(Interest.builder()
                            .place(place.get())
                            .user(user.get())
                            .build());
            map.put("interested", true);
        }
        return map;
    }

    public Page<Interest> getMoreInterestPlace(Long userId, Pageable pageable) {
        return interestRepository.findAllByUserId(userId, pageable);
    }
}

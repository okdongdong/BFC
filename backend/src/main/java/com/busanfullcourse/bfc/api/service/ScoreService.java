package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.ScoreRes;
import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Score;
import com.busanfullcourse.bfc.db.entity.User;
import com.busanfullcourse.bfc.db.repository.PlaceRepository;
import com.busanfullcourse.bfc.db.repository.ScoreRepository;
import com.busanfullcourse.bfc.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    public void setPlaceScore(Long placeId, Long userId, Float score) {

        Place place = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        scoreRepository.save(Score.builder()
                        .place(place)
                        .score(score)
                        .user(user)
                        .build());
    }

    public ScoreRes getPlaceScore(Long placeId, Long userId) {
        Score score = scoreRepository.findByPlacePlaceIdAndUserId(placeId, userId);
        return ScoreRes.builder()
                .score(score.getScore())
                .build();
    }

    public void updatePlaceScore(Long placeId, Long userId, Float newScore) {
        Score score = scoreRepository.findByPlacePlaceIdAndUserId(placeId, userId);
        score.setScore(newScore);
        scoreRepository.save(score);
    }

    public void deletePlaceScore(Long placeId, Long userId) {
        scoreRepository.delete(scoreRepository.findByPlacePlaceIdAndUserId(placeId, userId));
    }
}

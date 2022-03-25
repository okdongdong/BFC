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

    public void setPlaceScore(Long placeId, String username, Float score) {

        Place place = placeRepository.findById(placeId).orElseThrow(() -> new NoSuchElementException("장소가 없습니다."));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        scoreRepository.save(Score.builder()
                        .place(place)
                        .score(score)
                        .user(user)
                        .build());
    }

    public ScoreRes getPlaceScore(Long placeId, String username) {
        Score score = scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        if (score == null) {
            return ScoreRes.builder()
                    .score(null)
                    .build();
        }
        return ScoreRes.builder()
                .score(score.getScore())
                .build();
    }

    public void updatePlaceScore(Long placeId, String username, Float newScore) throws IllegalAccessException {
        Score score = scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        if (!score.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("본인이 아닙니다.");
        }
        score.setScore(newScore);
        scoreRepository.save(score);
    }

    public void deletePlaceScore(Long placeId, String username) throws IllegalAccessException {
        Score score = scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        if (!score.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException("본인이 아닙니다.");
        }
        scoreRepository.delete(scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username));
    }
}

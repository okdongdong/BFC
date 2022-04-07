package com.busanfullcourse.bfc.api.service;

import com.busanfullcourse.bfc.api.response.ScoreRes;
import com.busanfullcourse.bfc.common.util.ExceptionUtil;
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

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.PLACE_NOT_FOUND));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.USER_NOT_FOUND));

        Float newAverageScore = (place.getAverageScore() * place.getScoreCount() + score) / (place.getScoreCount() + 1);
        place.setAverageScore(newAverageScore);
        place.setScoreCount(place.getScoreCount() + 1);
        placeRepository.save(place);
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
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
        }
        Float oldScore = score.getScore();
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.PLACE_NOT_FOUND));
        Float newAverageScore = (place.getAverageScore() * place.getScoreCount() - oldScore + newScore) / (place.getScoreCount());

        place.setAverageScore(newAverageScore);
        placeRepository.save(place);

        score.setScore(newScore);
        scoreRepository.save(score);
    }

    public void deletePlaceScore(Long placeId, String username) throws IllegalAccessException {
        Score score = scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username);
        if (!score.getUser().getUsername().equals(username)) {
            throw new IllegalAccessException(ExceptionUtil.NOT_MYSELF);
        }

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new NoSuchElementException(ExceptionUtil.PLACE_NOT_FOUND));
        Float newAverageScore = (place.getAverageScore() * place.getScoreCount() - score.getScore()) / (place.getScoreCount() - 1);
        place.setAverageScore(newAverageScore);
        place.setScoreCount(place.getScoreCount() - 1);
        placeRepository.save(place);
        scoreRepository.delete(scoreRepository.findByPlacePlaceIdAndUserUsername(placeId, username));
    }
}

package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Place;
import com.busanfullcourse.bfc.db.entity.Recommend;
import com.busanfullcourse.bfc.db.entity.SurveyRecommend;
import lombok.*;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceListRes implements Serializable {

    private Long placeId;

    private String name;

    private String address;

    private Double lon;

    private Double lat;

    private String label;

    private Boolean category;

    private Float averageScore;

    private Integer scoreCount;

    private String thumbnail;

    public static List<PlaceListRes> of (List<Place> list) {
        return list.stream().map(place -> PlaceListRes.builder()
                        .placeId(place.getPlaceId())
                        .name(place.getName())
                        .lon(place.getLon())
                        .lat(place.getLat())
                        .label(place.getLabel())
                        .address(place.getAddress())
                        .category(place.getCategory())
                        .averageScore(place.getAverageScore())
                        .scoreCount(place.getScoreCount())
                        .thumbnail(place.getThumbnail())
                        .build())
                .collect(Collectors.toList());
    }

    public static Page<PlaceListRes> of (Page<Place> list) {
        return list.map(place -> PlaceListRes.builder()
                .placeId(place.getPlaceId())
                .name(place.getName())
                .lon(place.getLon())
                .lat(place.getLat())
                .label(place.getLabel())
                .address(place.getAddress())
                .category(place.getCategory())
                .averageScore(place.getAverageScore())
                .scoreCount(place.getScoreCount())
                .thumbnail(place.getThumbnail())
                .build());
    }


    public static Page<PlaceListRes> ofRecommend (Page<Recommend> list) {
        return list.map(recommend -> PlaceListRes.builder()
                .placeId(recommend.getPlace().getPlaceId())
                .name(recommend.getPlace().getName())
                .lon(recommend.getPlace().getLon())
                .lat(recommend.getPlace().getLat())
                .label(recommend.getPlace().getLabel())
                .address(recommend.getPlace().getAddress())
                .category(recommend.getPlace().getCategory())
                .averageScore(recommend.getPlace().getAverageScore())
                .scoreCount(recommend.getPlace().getScoreCount())
                .thumbnail(recommend.getPlace().getThumbnail())
                .build());
    }

    public static Page<PlaceListRes> ofSurveyRecommend (Page<SurveyRecommend> list) {
        return list.map(surveyRecommend -> PlaceListRes.builder()
                .placeId(surveyRecommend.getPlace().getPlaceId())
                .name(surveyRecommend.getPlace().getName())
                .lon(surveyRecommend.getPlace().getLon())
                .lat(surveyRecommend.getPlace().getLat())
                .label(surveyRecommend.getPlace().getLabel())
                .address(surveyRecommend.getPlace().getAddress())
                .category(surveyRecommend.getPlace().getCategory())
                .averageScore(surveyRecommend.getPlace().getAverageScore())
                .scoreCount(surveyRecommend.getPlace().getScoreCount())
                .thumbnail(surveyRecommend.getPlace().getThumbnail())
                .build());
    }
}

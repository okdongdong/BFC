package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Schedule;
import com.busanfullcourse.bfc.db.entity.WishFood;
import com.busanfullcourse.bfc.db.entity.WishPlace;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseRes {

    private Long fullCourseId;

    private String title;

    private Boolean isPublic;

    private Integer view;

    private String review;

    private LocalDate startedOn;

    private LocalDate finishedOn;

    private List<String> WishFoodList;

    private List<String> WishPlaceList;

    private List<ScheduleDetail> scheduleDetailList;

    private Integer LikeCnt;


    public static List<String> ofWishFoodList(List<WishFood> list) {
        return list.stream().map(WishFood::getKeyword)
                .collect(Collectors.toList());
    }

    public static List<String> ofWishPlaceList(List<WishPlace> list) {
        return list.stream().map(WishPlace::getKeyword)
                .collect(Collectors.toList());
    }

    @Builder
    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    public static class ScheduleDetail {
        private Long scheduleId;
        private Integer day;
        private Integer sequence;
        private String memo;
        private Long customPlaceId;
        private Long placeId;
        private String name;
        private String address;
        private Float lat;
        private Float lng;

        public static List<ScheduleDetail> of(List<Schedule> list) {
            List<ScheduleDetail> res = new ArrayList<>();
            for (Schedule schedule : list) {
                if (schedule.getPlace() == null) {
                    res.add(ScheduleDetail.builder()
                            .scheduleId(schedule.getScheduleId())
                            .day(schedule.getDay())
                            .sequence(schedule.getSequence())
                            .memo(schedule.getMemo())
                            .customPlaceId(schedule.getCustomPlace().getCustomPlaceId())
                            .name(schedule.getCustomPlace().getName())
                            .address(schedule.getCustomPlace().getAddress())
                            .lat(schedule.getCustomPlace().getLat())
                            .lng(schedule.getCustomPlace().getLng())
                            .build());
                } else {
                    res.add(ScheduleDetail.builder()
                            .scheduleId(schedule.getScheduleId())
                            .day(schedule.getDay())
                            .sequence(schedule.getSequence())
                            .memo(schedule.getMemo())
                            .placeId(schedule.getPlace().getPlaceId())
                            .name(schedule.getPlace().getName())
                            .address(schedule.getPlace().getAddress())
                            .lat(schedule.getPlace().getLat())
                            .lng(schedule.getPlace().getLng())
                            .build());
                }
            }
            return res;
        }
    }
}

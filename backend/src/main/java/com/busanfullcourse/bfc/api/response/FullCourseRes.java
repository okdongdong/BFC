package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.Schedule;
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

    @Builder
    public static class ScheduleDetail {
        private Integer day;
        private Integer order;
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
                if (schedule.getPlace().equals(null)) {
                    res.add(ScheduleDetail.builder()
                            .day(schedule.getDay())
                            .order(schedule.getOrder())
                            .memo(schedule.getMemo())
                            .customPlaceId(schedule.getCustomPlace().getCustomPlaceId())
                            .name(schedule.getCustomPlace().getName())
                            .address(schedule.getCustomPlace().getAddress())
                            .lat(schedule.getCustomPlace().getLat())
                            .lng(schedule.getCustomPlace().getLng())
                            .build());
                } else {
                    res.add(ScheduleDetail.builder()
                            .day(schedule.getDay())
                            .order(schedule.getOrder())
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

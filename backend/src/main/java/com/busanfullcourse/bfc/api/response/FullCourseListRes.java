package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullCourseListRes {

    private Long fullCourseId;

    private String title;

    private LocalDate startedOn;

    private LocalDate finishedOn;

    private Integer likeCnt;

    private List<String> thumbnailList;

    @JsonIgnore
    private List<Schedule> scheduleList;

    private List<FullCourseRes.ScheduleDetail> scheduleDetailList;

    public static List<String> ofThumbnailList(List<Schedule> list) {
        List<String> res = new ArrayList<>();
        for (Schedule schedule : list) {
            String thumbnail = schedule.getPlace().getThumbnail();
            if (thumbnail != null) {
                res.add(thumbnail);
            }
            if (res.size()==4){
                break;
            }
        }
        return res;
    }

    public static List<FullCourseListRes> of (List<FullCourse> list) {
        return list.stream().map(fullCourse -> FullCourseListRes.builder()
                .fullCourseId(fullCourse.getFullCourseId())
                .title(fullCourse.getTitle())
                .startedOn(fullCourse.getStartedOn())
                .finishedOn(fullCourse.getFinishedOn())
                .likeCnt(fullCourse.getLikeCnt())
                .scheduleList(fullCourse.getScheduleList())
                .build()
        ).collect(Collectors.toList());
    }
}

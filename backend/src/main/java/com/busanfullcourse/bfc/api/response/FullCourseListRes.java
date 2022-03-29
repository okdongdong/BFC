package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.db.entity.FullCourse;
import com.busanfullcourse.bfc.db.entity.Schedule;
import lombok.*;

import java.time.LocalDate;
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

    public static List<String> ofThumbnailList(List<Schedule> list) {
        return list.stream().map(schedule -> schedule.getPlace().getThumbnail()).collect(Collectors.toList());
    }

    public static List<FullCourseListRes> of (List<FullCourse> list) {
        return list.stream().map(fullCourse -> FullCourseListRes.builder()
                .fullCourseId(fullCourse.getFullCourseId())
                .title(fullCourse.getTitle())
                .startedOn(fullCourse.getStartedOn())
                .finishedOn(fullCourse.getFinishedOn())
                .likeCnt(fullCourse.getLikeList().size())
                .build()
        ).collect(Collectors.toList());
    }
}

package com.busanfullcourse.bfc.api.response;

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
public class LikeListRes {

    private Long fullCourseId;

    private String title;

    private List<String> thumbnailList;

    private LocalDate startedOn;

    private LocalDate finishedOn;

    private Integer likeCnt;

    public static List<String> ofThumbnailList(List<Schedule> list) {
        return list.stream().map(schedule -> schedule.getPlace().getThumbnail()).collect(Collectors.toList());
    }
}

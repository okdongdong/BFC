package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.db.entity.Sharing;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharingListRes {

    private static ConvertUtil convertUtil;

    private Long userId;
    private String nickname;
    private String profileImg;

    public static List<SharingListRes> of (List<Sharing> list) {
        return list.stream().map(sharing -> SharingListRes.builder()
                .userId(sharing.getUser().getId())
                .nickname(sharing.getUser().getNickname())
                .profileImg(convertUtil.convertByteArrayToString(sharing.getUser().getProfileImg()))
                .build()).collect(Collectors.toList());
    }
}

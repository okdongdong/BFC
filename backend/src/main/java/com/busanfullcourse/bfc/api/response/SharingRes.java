package com.busanfullcourse.bfc.api.response;

import com.busanfullcourse.bfc.common.util.ConvertUtil;
import com.busanfullcourse.bfc.db.entity.Sharing;
import com.busanfullcourse.bfc.db.entity.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharingRes {

    private static ConvertUtil convertUtil;

    private Long userId;
    private String nickname;
    private String profileImg;

    public static List<SharingRes> of (List<Sharing> list) {
        return list.stream().map(sharing -> SharingRes.builder()
                .userId(sharing.getUser().getId())
                .nickname(sharing.getUser().getNickname())
                .profileImg(convertUtil.convertByteArrayToString(sharing.getUser().getProfileImg()))
                .build()).collect(Collectors.toList());
    }

    public static SharingRes of (User user) {
        return SharingRes.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .profileImg(convertUtil.convertByteArrayToString(user.getProfileImg()))
                .build();
    }
}

import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FullCourseContentProps,
  MyFullCourseContentDayProps,
  ScheduleDetail,
} from "../../../types/main";
import MyFullCourseContentDay from "./MyFullCourseContentDay";

const BoxStyle = styled(Box)(() => ({
  width: 900,
  position: "absolute",
  top: "-120px",
  color: "white",
}));

function MyFullCourseContent({
  startOn,
  finishedOn,
  title,
  scheduleDetailList,
  thumbnailList,
  fullCourseId,
}: FullCourseContentProps) {
  const [dayPlaceList, setDayPlaceList] = useState([]);

  const calDayPlaceList = () => {
    const temp: any = [];
    if (!!scheduleDetailList) {
      for (let i = 0; i < scheduleDetailList.length; i++) {
        let scheduleDetail: ScheduleDetail | null = scheduleDetailList[i];
        if (scheduleDetail !== null) {
          while (scheduleDetail.day > temp.length) {
            temp.push([]);
          }
          temp[scheduleDetail.day - 1].push(scheduleDetail.name);
        }
      }
    }
    setDayPlaceList(temp);
  };

  const today = new Date().getTime();

  let nowStatus = "";

  if (today - new Date(finishedOn).getTime() > 0) {
    nowStatus = "종료된 여행";
  } else if (today - new Date(startOn).getTime() > 0) {
    nowStatus = "현재 여행중";
  } else {
    nowStatus = "예정된 여행";
  }

  useEffect(() => {
    calDayPlaceList();
  }, []);

  return (
    <BoxStyle>
      <p style={{ marginBottom: 5 }}>{nowStatus}</p>
      <h1 style={{ fontSize: 32, marginTop: 0 }}>{title}</h1>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {dayPlaceList.map((placeNameList: string[], index: number) => (
          <MyFullCourseContentDay
            key={index}
            day={index + 1}
            placeNameList={placeNameList}
          ></MyFullCourseContentDay>
        ))}
      </Box>
    </BoxStyle>
  );
}

export default MyFullCourseContent;

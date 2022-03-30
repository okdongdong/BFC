import { Box, styled } from "@mui/material";
import {
  FullCourseContentProps,
  MyFullCourseContentDayProps,
} from "../../../types/main";
import MyFullCourseContentDay from "./MyFullCourseContentDay";

const BoxStyle = styled(Box)(() => ({
  width: 900,
  position: "absolute",
  top: "-170px",
  color: "white",
}));

function MyFullCourseContent({
  startOn,
  finishedOn,
  title,
  dayPlaceList,
}: FullCourseContentProps) {
  const today = new Date().getTime();

  let nowStatus = "";

  if (today - new Date(finishedOn).getTime() > 0) {
    nowStatus = "종료된 여행";
  } else if (today - new Date(startOn).getTime() > 0) {
    nowStatus = "현재 여행중";
  } else {
    nowStatus = "예정된 여행";
  }

  return (
    <BoxStyle>
      <p style={{ marginBottom: 5 }}>{nowStatus}</p>
      <h1 style={{ fontSize: 32, marginTop: 0 }}>{title}</h1>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {dayPlaceList.map((place: MyFullCourseContentDayProps) => (
          <MyFullCourseContentDay
            courseDate={place.courseDate}
            day={place.day}
            placeList={place.placeList}
          ></MyFullCourseContentDay>
        ))}
      </Box>
    </BoxStyle>
  );
}

export default MyFullCourseContent;

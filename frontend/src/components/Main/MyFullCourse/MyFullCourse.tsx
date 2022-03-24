import { Card, CardActionArea, CardContent, styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import { FullCourseDetailListProps } from "../../../types/main";
import MyFullCourseBackground from "./MyFullCourseBackground";
import MyFullCourseContent from "./MyFullCourseContent";
const CardStyle = styled(Card)(() => ({
  width: "100%",
  textAlign: "left",
  marginRight: 10,
  borderRadius: 0,
}));

const CardBackgroundStyle = styled("div")(() => ({
  backgroundColor: "#FFC100",
  height: 150,
  width: "100%",
}));

function MyFullCourse({ fullCourseDetailList }: FullCourseDetailListProps) {
  const navigate = useNavigate();

  return (
    <Carousel>
      {fullCourseDetailList.map((fullCourseDetail, idx) => (
        <CardStyle
          key={idx}
          onClick={() =>
            navigate(`fullcourse/${fullCourseDetail.fullCourseId}`)
          }
        >
          <CardActionArea>
            <MyFullCourseBackground
              thumbnailList={fullCourseDetail.thumbnailList}
            ></MyFullCourseBackground>
            <CardContent
              sx={{
                justifyContent: "center",
                display: "flex",
                position: "relative",
                padding: 0,
              }}
            >
              <MyFullCourseContent
                thumbnailList={fullCourseDetail.thumbnailList}
                startOn={fullCourseDetail.startOn}
                finishedOn={fullCourseDetail.finishedOn}
                fullCourseId={fullCourseDetail.fullCourseId}
                title={fullCourseDetail.title}
                dayPlaceList={fullCourseDetail.dayPlaceList}
              ></MyFullCourseContent>
              <CardBackgroundStyle />
            </CardContent>
          </CardActionArea>
        </CardStyle>
      ))}
    </Carousel>
  );
}

export default MyFullCourse;

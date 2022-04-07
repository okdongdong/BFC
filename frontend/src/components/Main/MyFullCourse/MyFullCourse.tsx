import { Card, CardActionArea, CardContent, styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import {
  FullCourseContentProps,
  FullCourseDetailListProps,
} from "../../../types/main";
import MyFullCourseBackground from "./MyFullCourseBackground";
import MyFullCourseContent from "./MyFullCourseContent";
import { useEffect, useState } from "react";
import MainBackgroundCarousel from "../MainBackgroundCarousel";

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

const calCarouselList = (fullCourseDetailList: any) => {
  const carouselList: any = [];

  for (let i = 0; i < fullCourseDetailList.length; i++) {
    if (
      fullCourseDetailList[i] !== undefined &&
      fullCourseDetailList[i].scheduleDetailList?.length > 0
    ) {
      carouselList.push(fullCourseDetailList[i]);
    }
  }

  return carouselList;
};

function MyFullCourse({ fullCourseDetailList }: FullCourseDetailListProps) {
  const navigate = useNavigate();
  const [carouselList, setCarouselList] = useState([]);

  useEffect(() => {
    setCarouselList(calCarouselList(fullCourseDetailList));
  }, []);

  return (
    <>
      {carouselList.length == 0 ? (
        <MainBackgroundCarousel></MainBackgroundCarousel>
      ) : (
        <Carousel>
          {carouselList.map(
            (fullCourseDetail: FullCourseContentProps, idx: number) => (
              <CardStyle
                key={idx}
                onClick={() =>
                  navigate(`fullcourseDetail/${fullCourseDetail.fullCourseId}`)
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
                      startedOn={fullCourseDetail.startedOn}
                      finishedOn={fullCourseDetail.finishedOn}
                      fullCourseId={fullCourseDetail.fullCourseId}
                      title={fullCourseDetail.title}
                      scheduleDetailList={fullCourseDetail.scheduleDetailList}
                      thumbnailList={fullCourseDetail.thumbnailList}
                    ></MyFullCourseContent>
                    <CardBackgroundStyle />
                  </CardContent>
                </CardActionArea>
              </CardStyle>
            )
          )}
        </Carousel>
      )}
    </>
  );
}

export default MyFullCourse;

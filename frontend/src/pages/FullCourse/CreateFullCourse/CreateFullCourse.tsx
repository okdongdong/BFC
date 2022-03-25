import { Stack } from "@mui/material";
import React from "react";
import { placeList } from "../../../assets/dummyData/dummyData";
import CollapseContainer from "../../../components/FullCourse/CreateFullCourse/CollapseContainer";
import DailyFullCourse from "../../../components/FullCourse/CreateFullCourse/DailyFullCourse";
import DayBar from "../../../components/FullCourse/CreateFullCourse/DayBar";
import KakaoMap from "../../../components/FullCourse/CreateFullCourse/KakaoMap";
import PlaceCard from "../../../components/FullCourse/CreateFullCourse/PlaceCard";
import PlaceDetail from "../../../components/FullCourse/CreateFullCourse/PlaceDetail";
import PlaceSearch from "../../../components/FullCourse/CreateFullCourse/PlaceSearch";
import PlaceCardList from "../../../components/Main/PlaceCardList";

function CreateFullCourse() {
  return (
    <div style={{ width: "100%" }}>
      <DailyFullCourse></DailyFullCourse>
      {/* <DayBar></DayBar> */}
      <PlaceDetail></PlaceDetail>
      <PlaceSearch></PlaceSearch>
      <div style={{ display: "flex" }}>
        <CollapseContainer buttonPositionY={0}>풀코스</CollapseContainer>
        <CollapseContainer buttonPositionY={200}>
          검색창
          <hr />
          구분|구분|구분
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            {placeList.map((place, idx) => (
              <PlaceCard
                key={idx}
                placeId={place.placeId}
                category={place.category}
                name={place.name}
                thumbnail={place.thumbnail}
                address={place.address}
                averageScore={place.averageScore}
                keywords={place.keywords}
              ></PlaceCard>
            ))}
          </Stack>
        </CollapseContainer>
        <CollapseContainer buttonPositionY={400}>디테일</CollapseContainer>
        <KakaoMap></KakaoMap>
      </div>
    </div>
  );
}

export default CreateFullCourse;

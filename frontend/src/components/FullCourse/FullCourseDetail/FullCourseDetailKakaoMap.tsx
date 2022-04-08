// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Button, Icon, Stack } from "@mui/material";
import { useEffect } from "react";

import { Map, Polyline } from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import { PlaceCard, PlaceCardList } from "../../../redux/placeList/types";
import { useState } from "react";
import { ScheduleData } from "../../../types/detail";

const { kakao } = window;

interface LatLng {
  lat: number;
  lng: number;
}
interface StepProps {
  activeStep: number;
}

function FullCourseDetailKakaoMap({ steps, activeStep }: StepProps & Props) {
  const [dailyFullCoursePath, setDailyFullCoursePath] = useState<Array<LatLng>>(
    []
  );
  const test: any = [];
  if (steps) {
    for (let i = 0; i < steps.length; i++) {
      let scheduleDetail: ScheduleData | null = steps[i];
      if (scheduleDetail !== null) {
        while (scheduleDetail.day > test.length) {
          test.push([]);
        }
        test[scheduleDetail.day - 1].push({
          name: scheduleDetail.name,
          lat: scheduleDetail.lat,
          lng: scheduleDetail.lon,
        });
      }
    }
  }
  //   console.log("데이터 확인!!!!!!!!!!!!!!!", test);

  const [map, setMap] = useState<any>();

  const zoomIn = () => {
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };
  const zoomOut = () => {
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };
  const createDailyFullCoursePath = (placeCardList: PlaceCard[]) => {
    const tempPath: Array<LatLng> = [];
    placeCardList.map((placeCard) => {
      tempPath.push({
        lat: placeCard.content.lat,
        lng: placeCard.content.lng,
      });
    });
    return tempPath;
  };

  // useEffect(() => {
  //   setDailyFullCoursePath(() =>
  //     createDailyFullCoursePath(fullCourseList[pickedDay])
  //   );
  //   // placeList
  // }, [pickedDay, fullCourseList[pickedDay]]);

  return (
    <>
      {/* <Map // 지도를 표시할 Container
        center={nowCenter}
        isPanto={true}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
        onCreate={(map) => setMap(map)}
      >
        <Polyline
          path={dailyFullCoursePath}
          strokeWeight={5} // 선의 두께 입니다
          strokeColor={"#000"} // 선의 색깔입니다
          strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"dashed"} // 선의 스타일입니다
        />
        <FullCourseKakaoMapMarkers
          selectedPlaceId={selectedPlaceId}
          placeCardList={fullCourseList[pickedDay]}
          setCenter={setCenter}
        ></FullCourseKakaoMapMarkers>
      </Map>
      <div style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1000 }}>
        <Stack direction="column" spacing={1}>
          <Button
            sx={{
              height: 50,
              backgroundColor: "white",
              color: "#47A3EC",
            }}
            variant="contained"
            onClick={zoomIn}
          >
            <Icon>add</Icon>
          </Button>
          <Button
            sx={{
              height: 50,
              backgroundColor: "white",
              color: "#47A3EC",
            }}
            variant="contained"
            onClick={zoomOut}
          >
            <Icon>remove</Icon>
          </Button>
        </Stack>
      </div> */}
    </>
  );
}

const mapStateToProps = ({ fullCourse }: any) => ({
  steps: fullCourse.scheduleDetailList,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullCourseDetailKakaoMap);

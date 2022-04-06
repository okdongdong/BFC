// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Box, Button, Icon, IconButton, Stack } from "@mui/material";
import { useEffect } from "react";
import fullCourseCircle from "../../../assets/img/full_course_circle.png";
import fullCourseCircleHover from "../../../assets/img/full_course_circle_hover.png";
import fullCourseCircleClicked from "../../../assets/img/full_course_circle_clicked.png";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import { PlaceCard, PlaceCardList } from "../../../redux/placeList/types";
import { useState } from "react";
import FullCourseKakaoMapMarkers from "./FullCourseKakaoMapMarkers";
import PlaceKakaoMapMarkers from "./PlaceKakaoMapMarkers";

const { kakao } = window;

interface LatLng {
  lat: number;
  lng: number;
}

interface FullCourseKakaoMapProps {
  pickedDay: number;
  lat?: number;
  lng?: number;
  expandedFullCourse: boolean;
  expandedPlace: boolean;
  expandedPlaceDetail: boolean;
  nowFilterTypeIdx: number;
  nowCenter: { lat: number; lng: number };
  setNowCenter: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

function FullCourseKakaoMap({
  nowFilterTypeIdx,
  expandedFullCourse,
  expandedPlace,
  expandedPlaceDetail,
  pickedDay,
  lat = 35.1797913,
  lng = 129.074987,
  fullCourseList,
  placeList,
  placeListWithDistance,
  searchPlaceList,
  nowCenter,
  selectedPlaceId,
  setNowCenter,
}: FullCourseKakaoMapProps & Props) {
  const [dailyFullCoursePath, setDailyFullCoursePath] = useState<Array<LatLng>>(
    []
  );

  const [map, setMap] = useState<any>();
  const [expandCnt, setExpandCnt] = useState<number>(0);

  const nowSelectedPlaceList = () =>
    nowFilterTypeIdx === 0
      ? placeList
      : nowFilterTypeIdx === 1
      ? placeListWithDistance
      : nowFilterTypeIdx === 2
      ? placeList
      : searchPlaceList;

  const setCenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const newLng =
      lng -
      ((expandedFullCourse ? 0.02 : 0) +
        (expandedPlace ? 0.02 : 0) +
        (expandedPlaceDetail ? 0.02 : 0)) *
        2 ** (map.getLevel() - 6);

    setNowCenter({ lat: lat, lng: newLng });
  };
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

  useEffect(() => {
    setDailyFullCoursePath(() =>
      createDailyFullCoursePath(fullCourseList[pickedDay])
    );
    // placeList
  }, [pickedDay, fullCourseList[pickedDay]]);

  useEffect(() => {
    const cnt =
      (expandedFullCourse ? 1 : 0) +
      (expandedPlace ? 1 : 0) +
      (expandedPlaceDetail ? 1 : 0);

    if (map !== undefined) {
      const temp: { lat: number; lng: number } = {
        lat: map.getCenter().getLat(),
        lng:
          map.getCenter().getLng() +
          (cnt > expandCnt ? -0.02 : 0.02) * 2 ** (map.getLevel() - 6),
      };
      setNowCenter(temp);
    }
    setExpandCnt(cnt);
  }, [expandedFullCourse, expandedPlace, expandedPlaceDetail]);

  return (
    <>
      <Map // 지도를 표시할 Container
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
        <PlaceKakaoMapMarkers
          placeCardList={nowSelectedPlaceList()}
          setCenter={setCenter}
        ></PlaceKakaoMapMarkers>
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
      </div>
    </>
  );
}

const mapStateToProps = ({
  createFullCourse,
  placeListReducer,
  placeDetailReducer,
}: any) => ({
  fullCourseList: createFullCourse.fullCourseList,
  placeList: placeListReducer.placeList,
  placeListWithDistance: placeListReducer.placeListWithDistance,
  searchPlaceList: placeListReducer.searchPlaceList,
  selectedPlaceId: placeDetailReducer.selectedPlaceId,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FullCourseKakaoMap);

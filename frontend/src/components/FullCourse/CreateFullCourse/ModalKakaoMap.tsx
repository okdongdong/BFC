// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Box } from "@mui/material";
import { useEffect } from "react";

const { kakao } = window;

interface KakaoMapProps {
  mapId?: string;
  lat?: number;
  lng?: number;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

function ModalKakaoMap({
  mapId = "map",
  lat = 35.1797913,
  lng = 129.074987,
  setLocation,
}: KakaoMapProps) {
  const loadMap = () => {
    const container = document.getElementById(mapId);
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(lat, lng),
    });
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
      console.log(message);
    });
  };
  // kakao.maps.event.addListener(marker, "click", function () {
  //   alert("마커를 클릭했습니다!");
  //   console.log(marker);
  // });

  // // 마커에 dragstart 이벤트 등록
  // kakao.maps.event.addListener(marker, "dragstart", function () {
  //   console.log("마커에 dragstart 이벤트가 발생했습니다!");
  // });

  // // 마커에 dragend 이벤트 등록
  // kakao.maps.event.addListener(marker, "dragend", function (dragEvent: any) {
  //   console.log("마커에 dragend 이벤트가 발생했습니다!");
  //   console.log(marker);
  //   console.log(dragEvent);
  // });

  // 중심을 부드럽게 이동하는 함수
  // map.panTo(moveLatLon);

  useEffect(() => {
    loadMap();
  }, []);
  return <Box id={mapId} sx={{ flexGrow: 1 }}></Box>;
}

export default ModalKakaoMap;

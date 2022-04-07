// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Box } from "@mui/material";
import { useEffect } from "react";
import placeMarkerGreen from "../../../assets/img/place_marker_green.png";

const { kakao } = window;

interface KakaoMapProps {
  address: string;
  mapId?: string;
  lat?: number;
  lng?: number;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  nowSearch: boolean;
  nowMove: boolean;
  setNowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setNowMove: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomSearchList: any;
}

function ModalKakaoMap({
  address,
  nowSearch,
  nowMove,
  setNowSearch,
  setNowMove,
  setCustomSearchList,
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
    var markerImage = new kakao.maps.MarkerImage(
      placeMarkerGreen,
      new kakao.maps.Size(60, 60)
    );
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(lat, lng),
      image: markerImage,
    });
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      console.log(latlng);

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
      console.log(message);
    });
  };

  var places = new kakao.maps.services.Places();

  var callback = function (result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      setCustomSearchList([...result]);
      console.log(result);
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (nowSearch) {
      places.keywordSearch(`부산 ${address}`, callback);
      setNowSearch(false);
    }
  }, [nowSearch]);

  useEffect(() => {
    if (nowMove) {
      loadMap();
    }
    setNowMove(false);
  }, [nowMove]);

  return <Box id={mapId} sx={{ flexGrow: 1 }}></Box>;
}

export default ModalKakaoMap;

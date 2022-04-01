// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Box } from "@mui/material";
import { useEffect } from "react";
import fullCourseCircle from "../../../assets/img/full_course_circle.png";
import fullCourseCircleHover from "../../../assets/img/full_course_circle_hover.png";
import fullCourseCircleClicked from "../../../assets/img/full_course_circle_clicked.png";

const { kakao } = window;

interface KakaoMapProps {
  mapId?: string;
  lat?: number;
  lng?: number;
}

function FullCourseKakaoMap({
  mapId = "map",
  lat = 35.1797913,
  lng = 129.074987,
}: KakaoMapProps) {
  const loadMap = () => {
    const container = document.getElementById(mapId);
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);

    var imageSrc = fullCourseCircle,
      imageSize = new kakao.maps.Size(30, 30),
      imageOption = { offset: new kakao.maps.Point(15, 15) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var positions: any = [
        // 마커의 위치
        new kakao.maps.LatLng(35.1797913, 129.074987),
        new kakao.maps.LatLng(35.1897913, 129.074987),
        new kakao.maps.LatLng(35.19797913, 129.074987),
        new kakao.maps.LatLng(35.1757913, 129.074987),
        new kakao.maps.LatLng(35.1797913, 129.064987),
        new kakao.maps.LatLng(35.1897913, 129.075987),
        new kakao.maps.LatLng(35.19797913, 129.084987),
        new kakao.maps.LatLng(35.1757913, 129.0774987),
      ],
      selectedMarker: any = null; // 클릭한 마커를 담을 변수

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: positions, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#000000", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    var hoverImage = new kakao.maps.MarkerImage(
      fullCourseCircleHover,
      imageSize,
      imageOption
    );
    var clickedImage = new kakao.maps.MarkerImage(
      fullCourseCircleClicked,
      imageSize,
      imageOption
    );

    // 지도 위에 마커를 표시합니다
    for (var i = 0, len = positions.length; i < len; i++) {
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다

      // 마커를 생성합니다
      addMarker(positions[i]);
    }

    function addMarker(position: any) {
      var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage, // 마커이미지 설정
      });
      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          marker.setImage(hoverImage);
        }
      });

      // 마커에 mouseout 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 기본 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          marker.setImage(markerImage);
        }
      });

      // 마커에 click 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 클릭 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!selectedMarker && selectedMarker.setImage(markerImage);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(clickedImage);
        }

        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        selectedMarker = marker;
      });
      marker.setMap(map);
    }
  };

  // // MakrerImage 객체를 생성하여 반환하는 함수입니다
  // function createMarkerImage(
  //   markerSize: any,
  //   offset: any,
  //   spriteOrigin: any
  // ) {
  //   var markerImage = new kakao.maps.MarkerImage(
  //     SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
  //     markerSize, // 마커의 크기
  //     {
  //       offset: offset, // 마커 이미지에서의 기준 좌표
  //       spriteOrigin: spriteOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
  //       spriteSize: spriteImageSize, // 스프라이트 이미지의 크기
  //     }
  // //   );

  //   return markerImage;
  // }
  // };

  // // // 지도에 클릭 이벤트를 등록합니다
  // // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
  // kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
  //   // 클릭한 위도, 경도 정보를 가져옵니다
  //   var latlng = mouseEvent.latLng;

  //   // 마커 위치를 클릭한 위치로 옮깁니다
  //   marker.setPosition(latlng);
  //   var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
  //   message += "경도는 " + latlng.getLng() + " 입니다";

  //   console.log(message);
  // });

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

export default FullCourseKakaoMap;

// import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Box } from "@mui/material";
import { useEffect } from "react";

const { kakao } = window;

function KakaoMap() {
  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      var map = new kakao.maps.Map(container, options);
      // 위도, 경도로 변환 및 마커표시
      // var geocoder = new kakao.maps.services.Geocoder();
      // geocoder.addressSearch("장전동", function (result: any, status: any) {
      //   console.log(result, status);

      //   if (status === kakao.maps.services.Status.OK) {
      //     var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(33.450701, 126.570667),
      });

      // map.setCenter(coords);
      // }
      // });
    }, 300);
  }, []);

  // 중심을 부드럽게 이동하는 함수
  // map.panTo(moveLatLon);

  return <Box id="map" sx={{ flexGrow: 1 }}></Box>;
}

export default KakaoMap;

import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import placeMarkerGreen from "../../../assets/img/place_marker_green.png";
import { customAxios } from "../../../lib/customAxios";

interface PlaceLocationInfo {
  name: string;
  placeId: number;
  lat: number;
  lng: number;
}

const Overlay = styled("div")({
  backgroundColor: "white",
  borderRadius: 10,
  minWidth: 100,
  boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
});

function ProfileKakaoMap({ profileUserId }: Props) {
  const [placeLocationInfoList, setPlaceLocationInfoList] = useState([]);
  const getInfo = async () => {
    const temp: any = [];
    try {
      const res = await customAxios({
        method: "get",
        url: `/users/${profileUserId}/interest`,
        params: {
          page: 0,
          size: 100,
        },
      });
      res.data.content.map((item: any) => {
        temp.push({
          name: item.name,
          plcaeId: item.placeId,
          lat: item.lat,
          lng: item.lon,
        });
      });
      setPlaceLocationInfoList(temp);
    } catch (e) {}
  };
  useEffect(() => {
    getInfo();
  }, []);
  const EventMarkerContainer = ({
    placeLocationInfo,
  }: {
    placeLocationInfo: PlaceLocationInfo;
  }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <CustomOverlayMap
          position={{
            lat: placeLocationInfo.lat,
            lng: placeLocationInfo.lng,
          }}
          xAnchor={0.5}
          yAnchor={1.8}
        >
          <Overlay style={{ opacity: isVisible ? 1 : 0 }}>
            <h3 className="title">{placeLocationInfo.name}</h3>
          </Overlay>
        </CustomOverlayMap>
        <MapMarker
          image={{
            src: placeMarkerGreen, // 마커이미지의 주소입니다
            size: {
              width: 60,
              height: 60,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 30,
                y: 60,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
          position={{
            lat: placeLocationInfo.lat,
            lng: placeLocationInfo.lng,
          }} // 마커를 표시할 위치
          title={placeLocationInfo.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          onClick={(marker) => map.panTo(marker.getPosition())}
          onMouseOver={() => setIsVisible(true)}
          onMouseOut={() => setIsVisible(false)}
        />
      </>
    );
  };

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 35.1797913,
        lng: 129.074987,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={8} // 지도의 확대 레벨
    >
      {placeLocationInfoList.map((placeLocationInfo, idx) => (
        <EventMarkerContainer placeLocationInfo={placeLocationInfo} key={idx} />
      ))}
    </Map>
  );
}

const mapStateToProps = ({ profile }: any) => {
  return {
    profileUserId: profile.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ProfileKakaoMap);

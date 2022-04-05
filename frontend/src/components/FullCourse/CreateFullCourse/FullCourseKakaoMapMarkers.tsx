import fullCourseCircle from "../../../assets/img/full_course_circle.png";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import { PlaceCard } from "../../../redux/placeList/types";

interface FullCourseKakaoMapMarkersProps {
  placeCardList: PlaceCard[];
  setCenter: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function FullCourseKakaoMapMarkers({
  placeCardList,
  setCenter,
}: FullCourseKakaoMapMarkersProps) {
  return (
    <div>
      {placeCardList.map((placeCard: PlaceCard, idx: number) => (
        <div key={idx}>
          <CustomOverlayMap
            position={{
              lat: placeCard.content.lat,
              lng: placeCard.content.lng,
            }}
            xAnchor={0.5}
            yAnchor={0.5}
          >
            {" "}
            <div
              onClick={() =>
                setCenter({
                  lat: placeCard.content.lat,
                  lng: placeCard.content.lng,
                })
              }
              style={{
                backgroundColor: "#F0A94B",
                borderRadius: "50%",
                border: "2px solid black",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="customoverlay"
            >
              <h1 className="title">{idx + 1}</h1>
            </div>
            <MapMarker
              image={{
                src: fullCourseCircle, // 마커이미지의 주소입니다
                size: {
                  width: 0,
                  height: 0,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 25,
                    y: 25,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
              position={{
                lat: placeCard.content.lat,
                lng: placeCard.content.lng,
              }} // 마커를 표시할 위치
              title={placeCard.content.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
          </CustomOverlayMap>
        </div>
      ))}
    </div>
  );
}

export default FullCourseKakaoMapMarkers;

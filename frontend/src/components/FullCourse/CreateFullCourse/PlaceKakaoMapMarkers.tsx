import placeMarker from "../../../assets/img/place_marker.png";
import placeMarkerBlue from "../../../assets/img/place_marker_blue.png";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { PlaceCard } from "../../../redux/placeList/types";
import { styled } from "@mui/styles";
import { connect } from "react-redux";
import { setSelectedPlaceId } from "../../../redux/placeDetail/actions";

interface PlaceKakaoMapMarkersProps {
  placeCardList: PlaceCard[];
  setCenter: ({ lat, lng }: { lat: number; lng: number }) => void;
}

const Overlay = styled("div")({
  backgroundColor: "white",
  borderRadius: 10,
  minWidth: 100,
  boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
});

function PlaceKakaoMapMarkers({
  setSelectedPlaceId,
  placeCardList,
  setCenter,
}: PlaceKakaoMapMarkersProps & Props) {
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
            yAnchor={1.8}
          >
            <Overlay>
              <h3 className="title">{placeCard.content.name}</h3>
            </Overlay>
            <MapMarker
              onClick={() => {
                setCenter({
                  lat: placeCard.content.lat,
                  lng: placeCard.content.lng,
                });
                setSelectedPlaceId(placeCard.content.placeId);
              }}
              image={{
                src: !placeCard.content.category
                  ? placeMarker
                  : placeMarkerBlue, // 마커이미지의 주소입니다
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedPlaceId: (placeId: number) =>
      dispatch(setSelectedPlaceId(placeId)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceKakaoMapMarkers);

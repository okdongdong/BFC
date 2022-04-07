import { connect } from "react-redux";
import PlaceShedule from "./PlaceSchedule";
function PlaceInfo({ info, address, station }: Props) {
  return (
    <div style={{ width: "500px", textAlign: "left" }}>
      <p style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}>
        {info}
      </p>
      <p style={{ marginTop: "8px", marginBottom: "8PX" }}>주소</p>
      <p style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}>
        {address}
      </p>
      <p style={{ marginTop: "8px", marginBottom: "8PX" }}>교통</p>
      {station ? (
        <p
          style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}
        >
          {station}
        </p>
      ) : (
        <p
          style={{
            marginTop: "8px",
            marginBottom: "8PX",

            color: "gray",
          }}
        >
          교통정보 준비중
        </p>
      )}

      <PlaceShedule></PlaceShedule>
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    info: place.info,
    address: place.address,
    station: place.station,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PlaceInfo);

import PlaceReview from "./Review/PlaceReview";
import StarScore from "../Main/StarScore";
import { styled } from "@mui/material";
import PlaceImg from "./PlaceImg";
import PlaceInfo from "../../components/Detail/PlaceInfo";
import Grid from "@mui/material/Grid";
import PlaceRating from "./PlaceRating";
import AnotherPlatform from "./AnotherPlatform";
import PlaceLike from "./PlaceLike";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/customAxios";
import { connect } from "react-redux";
import KakaoMap from "../FullCourse/CreateFullCourse/KakaoMap";
const PlaceNameStyle = styled("h2")(() => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  justifyContent: "space-between",
  fontSize: "18px",
  width: "220px",
}));
function RestaurantDetail({ lat, lng, name, averageScore }: Props) {
  return (
    <div
      style={{
        marginTop: "50px",
        width: "53%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={3}>
          <PlaceNameStyle>
            {name}
            <StarScore starScore={averageScore.toFixed(2)}></StarScore>
          </PlaceNameStyle>
          <PlaceImg></PlaceImg>
          <PlaceLike></PlaceLike>
          <Menu></Menu>
        </Grid>
        <Grid xs={6}>
          <PlaceRating></PlaceRating>
          <PlaceInfo></PlaceInfo>
        </Grid>
        <Grid xs={3}>
          <AnotherPlatform></AnotherPlatform>
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "1000px",
            height: "300px",
          }}
        >
          <KakaoMap lat={lat} lng={lng}></KakaoMap>
        </div>
      </div>
      <PlaceReview></PlaceReview>
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    name: place.name,
    averageScore: place.averageScore,
    // placeId: place.placeId,
    lat: place.lat,
    lng: place.lon,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(RestaurantDetail);

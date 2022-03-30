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
import axios from "axios";
import { useEffect, useState } from "react";
const PlaceNameStyle = styled("h2")(() => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
}));
function RestaurantDetail() {
  const name: string = "부산 목구멍";
  const place_id = 1; //데이터 가져옴
  const [averageScore, setAverageScore] = useState(1);
  //평점가져오기
  function getScore() {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/place/${place_id}/score`,
    }).then((res) => {
      console.log(res);
      setAverageScore(res.data);
    });
  }
  useEffect(() => {
    getScore();
  }, [averageScore]);

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
            <StarScore starScore={averageScore}></StarScore>
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

      <PlaceReview></PlaceReview>
    </div>
  );
}
export default RestaurantDetail;

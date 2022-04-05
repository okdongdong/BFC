import PlaceReview from "./Review/PlaceReview";
import StarScore from "../Main/StarScore";
import { styled } from "@mui/material";
import PlaceImg from "./PlaceImg";
import PlaceInfo from "../../components/Detail/PlaceInfo";
import Grid from "@mui/material/Grid";
import PlaceRating from "./PlaceRating";
import AnotherPlatform from "./AnotherPlatform";
import PlaceLike from "./PlaceLike";
const PlaceNameStyle = styled("h2")(() => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
}));
function RestaurantDetail() {
  const name: string = "부산 해운대";
  const averageScore: number = 4.7;
  return (
    <div
      style={{
        marginTop: "150px",
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

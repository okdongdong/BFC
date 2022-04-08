import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  styled,
  Stack,
  Paper,
} from "@mui/material";
import { connect } from "react-redux";
import { PlaceCardProps } from "../../../types/main";
import noImage from "../../../assets/img/logo_with_text.png";
import StarScore from "../../Main/StarScore";

const CardStyle = styled(Card)(() => ({
  textAlign: "left",
  display: "flex",
  justifyContent: "start",
  height: 132,
  zIndex: 100,
  width: 350,
  position: "relative",

  "&:hover": {
    backgroundColor: "#FFEFB5",
  },
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  minWidth: 100,
  minHeight: 100,
  width: "100%",
  height: "100%",
}));

const PlaceNameStyle = styled("h3")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));

const PlaceAddressNameStyle = styled("p")(() => ({
  color: "grey",
  fontSize: 12,
  marginTop: 8,
  marginBottom: 8,
}));

function PlaceCard({
  placeId,
  name,
  thumbnail,
  address,
  averageScore,
  keywords = [],
  selectedPlaceId,
}: PlaceCardProps & Props) {
  const newKeywords: Array<string> = keywords.slice(0, 3);
  console.log(placeId, selectedPlaceId);
  return (
    // 카테고리 별로 이동경로가 달라야 함
    <CardStyle
      sx={{ backgroundColor: placeId === selectedPlaceId ? "#FFE793" : "" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Paper
          sx={{ margin: 1, minHeight: 100, width: "100%", padding: 0.5 }}
          square
        >
          <CardMediaStyle
            image={
              thumbnail === " "
                ? "https://www.chanchao.com.tw/images/default.jpg"
                : thumbnail
            }
            title={name}
          />
        </Paper>
      </div>
      <CardContent sx={{ width: "100%" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PlaceNameStyle>{name}</PlaceNameStyle>
            <StarScore
              starScore={averageScore.toFixed(2)}
              fontSize={16}
              starSize={20}
            ></StarScore>
          </div>
          <PlaceAddressNameStyle>{address}</PlaceAddressNameStyle>
        </div>
        <Stack direction="row" spacing={1}>
          {newKeywords.map((item, key) => (
            <Chip sx={{ fontSize: 12 }} key={key} label={`#${item}`} />
          ))}
        </Stack>
      </CardContent>
    </CardStyle>
  );
}

const mapStateToProps = ({ placeDetailReducer }: any) => ({
  selectedPlaceId: placeDetailReducer.selectedPlaceId,
});

type Props = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(PlaceCard);

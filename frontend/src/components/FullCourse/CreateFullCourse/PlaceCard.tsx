import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  styled,
  Stack,
  Paper,
} from "@mui/material";
import { PlaceCardProps } from "../../../types/main";
import StarScore from "../../Main/StarScore";

const CardStyle = styled(Card)(() => ({
  textAlign: "left",
  display: "flex",
  justifyContent: "start",
  zIndex: 100,
  width: 350,
  position: "relative",
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
  category,
  name,
  thumbnail,
  address,
  averageScore,
  keywords,
}: PlaceCardProps) {
  const newKeywords: Array<string> = keywords.slice(0, 3);

  return (
    // 카테고리 별로 이동경로가 달라야 함
    <CardStyle onClick={() => {}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Paper
          sx={{ margin: 1, minHeight: 100, minWidth: 100, padding: 0.5 }}
          square
        >
          <CardMediaStyle image={thumbnail} title={name} />
        </Paper>
      </div>
      <CardContent>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PlaceNameStyle>{name}</PlaceNameStyle>
            <StarScore
              starScore={averageScore}
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

export default PlaceCard;

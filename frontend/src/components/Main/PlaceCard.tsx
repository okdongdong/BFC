import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Chip,
  styled,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarScore from "./StarScore";

import { PlaceCardProps } from "../../types/Main";

const CardStyle = styled(Card)(() => ({
  width: 300,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 10,
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  height: 200,
}));

const PlaceNameStyle = styled("h2")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const PlaceAddressNameStyle = styled("p")(() => ({
  fontSize: 16,
  color: "grey",
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
  const navigate = useNavigate();

  return (
    // 카테고리 별로 이동경로가 달라야 함
    <CardStyle
      onClick={() =>
        navigate(`/${category ? "restaurant" : "attraction"}/${placeId}`)
      }
    >
      <CardActionArea>
        <CardMediaStyle image={thumbnail} title={name} />
        <CardContent>
          <PlaceNameStyle>
            {name}
            <StarScore starScore={averageScore}></StarScore>
          </PlaceNameStyle>
          <PlaceAddressNameStyle>{address}</PlaceAddressNameStyle>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            {keywords.map((item, key) => (
              <Chip key={key} label={`#${item}`} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </CardStyle>
  );
}

export default PlaceCard;

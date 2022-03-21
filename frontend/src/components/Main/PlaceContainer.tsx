import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

interface PlaceContainerProps {
  placeId: number;
  name: string;
  thumbnail: string;
  address: string;
  averageScore: number;
  category: number; // 음식점인지 관광지인지 구별 => 1: 음식점, 0: 관광지라 가정
  keywords: string[];
}

const useStyles = makeStyles(() => ({
  scoreStar: { color: "orange", height: 48 },
}));

function PlaceContainer({
  placeId,
  category,
  name,
  thumbnail,
  address,
  averageScore,
  keywords,
}: PlaceContainerProps) {
  const CardStyle = styled(Card)(() => ({
    maxWidth: 400,
    borderRadius: "25px",
  }));

  const CardMediaStyle = styled(CardMedia)(() => ({
    height: 300,
  }));

  const classes = useStyles();

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
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography gutterBottom variant="h5" component="h2">
            {averageScore}
          </Typography>
          <StarIcon fontSize="inherit" className={classes.scoreStar} />

          <div>
            {keywords.map((item) => (
              <Chip label={`#${item}`} />
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </CardStyle>
  );
}

export default PlaceContainer;

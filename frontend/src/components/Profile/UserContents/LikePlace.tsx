import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";
import { style } from "@mui/system";

interface place {
  place_id: number;
  name: string;
  thumbnail: string;
  average_score: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "150px",
    height: "150px",
    margin: theme.spacing(3),
  },
}));
export default function LikePlace() {
  const classes = useStyles();
  const placesList: Array<place> = [
    {
      place_id: 2,
      name: "목구멍",
      thumbnail:
        "https://media-cdn.tripadvisor.com/media/photo-s/1c/7a/0b/0d/caption.jpg",
      average_score: 4.5,
    },
    {
      place_id: 3,
      name: "목구멍",
      thumbnail:
        "https://media-cdn.tripadvisor.com/media/photo-s/1c/7a/0b/0d/caption.jpg",
      average_score: 4.2,
    },
  ];
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < placesList.length) {
      baseCard.push(
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Card
            sx={{
              width: "200px",
              height: "200px",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "10px",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={placesList[i].thumbnail}
              alt="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontSize: "15px" }}
              >
                {placesList[i].name}
                {placesList[i].average_score}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      baseCard.push(<Paper elevation={3} className={classes.paper}></Paper>);
    }
  }

  return (
    <div>
      <p
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "left",
          marginLeft: "23rem",
        }}
      >
        관심 장소
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {baseCard}
      </div>
    </div>
  );
}

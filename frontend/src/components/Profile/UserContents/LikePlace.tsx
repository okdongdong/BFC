import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";
import MoreModal from "./Modal/PlaceModal";
import { connect } from "react-redux";

interface place {
  place_id: number;
  name: string;
  thumbnail: string;
  average_score: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "200px",
    height: "200px",
    margin: "10px",
    paddingRight: "0",
    paddingBottom: "0",
    paddingTop: "0",
    paddingLeft: "0",
  },
}));

function LikePlace({ interestList }: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const title = "관심 장소";
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
          key={i}
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
          marginLeft: "300px",
        }}
      >
        {title}
        <button
          style={{ float: "right", marginRight: "300px" }}
          onClick={() => setOpen(true)}
        >
          더보기
        </button>
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
      {open && (
        <MoreModal
          open={open}
          setOpen={() => setOpen(false)}
          contentList={placesList}
          title={title}
        ></MoreModal>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    interestList: profile.interestList,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(LikePlace);

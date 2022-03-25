import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";

interface place {
  fullcourse_id: number;
  name: string;
  thumbnail: string;
  label: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "150px",
    height: "150px",
    margin: theme.spacing(3),
  },
  text: {
    position: "absolute",
    textAlign: "center",
  },
}));
export default function MyFullCourse() {
  const classes = useStyles();
  const nickname = "나는 윈터야"; // props 받아 가져와야함
  const placesList: Array<place> = [
    {
      fullcourse_id: 2,
      name: "광안리",
      thumbnail:
        "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen",
      label: "나혼자여행",
    },
    {
      fullcourse_id: 3,
      name: "목구멍",
      thumbnail:
        "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen",
      label: "가족여행",
    },
  ];
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < placesList.length) {
      baseCard.push(
        <div style={{ position: "relative" }}>
          <img
            style={{
              width: "200px",
              height: "200px",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "10px",
            }}
            src={placesList[i].thumbnail}
          ></img>
          <div
            style={{
              width: "200px",
              height: "200px",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "10px",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: 0,
              left: 0,
            }}
          >
            <p style={{ color: "white" }}>#{placesList[i].label}</p>
          </div>
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
        {nickname}님의 풀코스
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

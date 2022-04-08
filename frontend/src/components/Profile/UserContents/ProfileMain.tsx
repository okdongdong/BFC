import React from "react";
import LikePlace from "./LikePlace";
import LikeFullCourse from "./LikeFullCourse";
import MyFullCourse from "./MyFullCourse";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProfileKakaoMap from "./ProfileKakaoMap";
const useStyles = makeStyles((theme: Theme) => ({
  likePlace: {
    marginTop: theme.spacing(12),
    // marginRight: theme.spacing(),
  },
}));
function ProfileMain() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.likePlace}>
        <LikePlace></LikePlace>
      </div>
      <MyFullCourse></MyFullCourse>
      <LikeFullCourse></LikeFullCourse>
      <p
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "left",
          marginLeft: "200px",
        }}
      >
        관심 장소 위치
      </p>
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
            width: "78%",
            height: "500px",
          }}
        >
          <ProfileKakaoMap></ProfileKakaoMap>
        </div>
      </div>
      {/* <VisitedPlace></VisitedPlace> */}
    </div>
  );
}
export default ProfileMain;

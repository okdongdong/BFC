import React from "react";
import LikePlace from "./LikePlace";
import LikeFullCourse from "./LikeFullCourse";
import MyFullCourse from "./MyFullCourse";
import VisitedPlace from "./VisitedPlace";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
        <LikePlace></LikePlace>,
      </div>
      <MyFullCourse></MyFullCourse>,<LikeFullCourse></LikeFullCourse>,
      {/* <VisitedPlace></VisitedPlace> */}
    </div>
  );
}
export default ProfileMain;
export {};

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import userImg from "../../../assets/img/userImg.png";
const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function ProfileImg() {
  const classes = useStyles();
  return (
    <div>
      <img src={userImg} className={classes.myImg}></img>
    </div>
  );
}
export default ProfileImg;

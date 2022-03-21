import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import userImg from "../../../assets/img/userImg.png";
const useStyles = makeStyles((theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function Profileimg() {
  const classes = useStyles();
  return (
    <div>
      <img src={userImg} className={classes.myImg}></img>
    </div>
  );
}
export default Profileimg;

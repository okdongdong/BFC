import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.2, 3, 0.2),
    cursor: "pointer",
  },
}));

function ProfileInfo() {
  const nickname: string = "나는 윈터야";
  const classes = useStyles();
  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: 20 }}>{nickname}</span>
      <Link to="/changeUser">
        <button className={classes.btn}>회원정보관리</button>
      </Link>
    </div>
  );
}
export default ProfileInfo;

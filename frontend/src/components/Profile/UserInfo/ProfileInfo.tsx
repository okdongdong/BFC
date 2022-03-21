import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
      <button className={classes.btn}>회원정보관리</button>
    </div>
  );
}
export default ProfileInfo;

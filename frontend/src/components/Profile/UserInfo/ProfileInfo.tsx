import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AccountReducer } from "../../../redux/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.2, 3, 0.2),
    cursor: "pointer",
  },
}));

function ProfileInfo({ nickname, isLogin }: Props) {
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
const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    isLogin: account.isLogin,
    nickname: account.nickname,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ProfileInfo);

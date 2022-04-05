import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.2, 3, 0.2),
    cursor: "pointer",
  },
}));

function ProfileInfo({ currentNickname, nickname }: Props) {
  const classes = useStyles();
  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: 20 }}>{nickname}</span>
      {currentNickname === nickname ? (
        <Link to="/changeUser">
          <button className={classes.btn}>회원정보관리</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    currentNickname: account.nickname,
    nickname: profile.nickname,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ProfileInfo);

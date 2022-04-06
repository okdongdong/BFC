import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { customAxios } from "../../../lib/customAxios";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.2, 3, 0.2),
    cursor: "pointer",
  },
}));

function ProfileInfo({
  currentNickname,
  nickname,
  isFollowing,
  profileUserId,
}: Props) {
  const classes = useStyles();
  const [btnNane, setBtnName] = useState(isFollowing);
  function follow() {
    customAxios({
      method: "post",
      url: `/users/${profileUserId}/follow`,
    })
      .then((res) => {
        console.log("팔로우성공");
        setBtnName(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function unFollow() {
    customAxios({
      method: "post",
      url: `/users/${profileUserId}/follow`,
    })
      .then((res) => {
        console.log("팔로우 취소 성공");
        setBtnName(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: 20 }}>{nickname}</span>
      {currentNickname === nickname ? (
        <Link to="/changeUser">
          <button className={classes.btn}>회원정보관리</button>
        </Link>
      ) : (
        <>
          {btnNane ? (
            <button className={classes.btn} onClick={unFollow}>
              팔로우 취소
            </button>
          ) : (
            <button className={classes.btn} onClick={follow}>
              팔로우
            </button>
          )}
        </>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    currentNickname: account.nickname,
    nickname: profile.nickname,
    isFollowing: profile.isFollowing,
    profileUserId: profile.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ProfileInfo);

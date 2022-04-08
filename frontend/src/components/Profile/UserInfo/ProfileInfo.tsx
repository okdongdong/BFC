import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { customAxios } from "../../../lib/customAxios";
import { setProfileData } from "../../../redux/profile/actions";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";
import { SetProfileData } from "../../../types/profile";

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
  setProfileData,
  profile,
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
        const newProfileData = profile;
        const newFollowerCnt = profile.followerCnt + 1;
        newProfileData.followerCnt = newFollowerCnt;
        setProfileData(newProfileData);
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
        const newProfileData = profile;
        const newFollowerCnt = profile.followerCnt - 1;
        newProfileData.followerCnt = newFollowerCnt;
        setProfileData(newProfileData);
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
        <Link to="/changeUser" style={{ textDecoration: "none" }}>
          <Button variant="contained" className={classes.btn}>
            회원정보관리
          </Button>
        </Link>
      ) : (
        <>
          {btnNane ? (
            <Button
              variant="outlined"
              color="error"
              className={classes.btn}
              onClick={unFollow}
            >
              팔로우 취소
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.btn}
              onClick={follow}
            >
              팔로우
            </Button>
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
    profile: profile,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileData: (profileData: SetProfileData) =>
      dispatch(setProfileData(profileData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);

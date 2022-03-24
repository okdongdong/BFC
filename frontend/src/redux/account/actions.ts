import axios from "axios";
import { Dispatch } from "redux";
import { LoginUserInfo, NavUserInfo } from "../../types/account";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./types";

const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    payload: 1,
  };
};
const userLoginSuccess = (navUserInfo: NavUserInfo) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: navUserInfo,
  };
};
const userLoginFailure = (err: any) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: err,
  };
};

export const userLogin = (userInfo: LoginUserInfo) => {
  return async (dispatch: Dispatch) => {
    dispatch(userLoginRequest());

    const data = {
      username: userInfo.username,
      password: userInfo.password,
    };

    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        data: data,
      });

      localStorage.setItem("isLogin", "true");
      localStorage.setItem(
        "accessToken",
        `${res.data.grantType}${res.data.accessToken}`
      );
      localStorage.setItem(
        "refreshToken",
        `${res.data.grantType}${res.data.refreshToken}`
      );

      console.log(res);

      const newUserInfo = {
        nickname: res.data.nickname,
        userId: res.data.userId,
        profileImg:
          res.data.profileImg ||
          "https://post-phinf.pstatic.net/MjAxODEyMjZfMjY5/MDAxNTQ1ODA5OTg2MjU5.fB8mb5wDo84uztMAGYGrOHfcTxL8-NcmqaoomM7BmSgg.o-wdtnhWUzDIkJCQsPzCT5ZWrTPYdhlIcOeXVE2SJsIg.JPEG/2.jpg?type=w1200",
      };

      dispatch(userLoginSuccess(newUserInfo));

      // 로그인 성공시 메인페이지로 이동
    } catch (err) {
      console.log(err);
      dispatch(userLoginFailure(err));
    }
  };
};

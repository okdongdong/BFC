import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import { LoginUserInfo, NavUserInfo, SetUserInfo } from "../../types/account";
import { errorControl, loadingControl } from "../baseInfo/actions";
import { resetFullCourse } from "../createFullCourse/actions";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_PROFILE_IMG,
  SET_USER_INFO,
  RESET_USER_INFO,
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

export const setProfileImg = (imgUrl: string) => {
  return {
    type: SET_PROFILE_IMG,
    payload: imgUrl,
  };
};

export const resetUserInfo = () => {
  return {
    type: RESET_USER_INFO,
  };
};
export const setUserInfo = (userInfo: SetUserInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};
export const getUserInfo = (userId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(userLoginRequest()); //로딩 중

    try {
      const res = await customAxios({
        method: "get",
        url: `users/${userId}`,
      });
      dispatch(setUserInfo(res.data));
    } catch (err) {
      console.log(err);
    }
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

      // localStorage.setItem("isLogin", "true");
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

export const userLogout = () => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);
    try {
      const res = await customAxios({
        method: "post",
        url: `/auth/logout`,
        headers: {
          RefreshToken: localStorage.getItem("refreshToken") || "",
        },
      });
      console.log(res);
      localStorage.clear();
      dispatch(resetUserInfo());
      dispatch(resetFullCourse());
    } catch (e) {
      console.log(e);
      errorControl(dispatch, "로그아웃에 실패했습니다.");
    }

    loadingControl(dispatch, false);
  };
};

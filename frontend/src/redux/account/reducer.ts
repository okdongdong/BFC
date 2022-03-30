import { AnyAction } from "redux";
import { NavUserInfo } from "../../types/account";
import {
  SET_PASSWORD_INFO,
  SET_PROFILE_IMG,
  SET_USER_INFO,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./types";

interface AccountStateType extends NavUserInfo {
  loading: boolean;
  err?: any;
  isLogin: boolean;
  gender: boolean;
  birthday: string;
  password: string;
  passwordConfirmation: string;
}

const initialState: AccountStateType = {
  nickname: "",
  userId: 0,
  profileImg: null,
  loading: false,
  isLogin: false,
  gender: false,
  birthday: "",
  password: "",
  passwordConfirmation: "",
};

const accountReducer = (
  state: NavUserInfo = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...action.payload,
        isLogin: true,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        err: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...initialState,
      };
    case SET_PROFILE_IMG:
      return {
        ...state,
        profileImg: action.payload,
      };
    case SET_PASSWORD_INFO:
      return {
        ...state,
        password: action.payload.password,
        passwordConfirmation: action.payload.passwordCheck,
      };
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;

import { AnyAction } from "redux";
import { NavUserInfo } from "../../types/account";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./types";

interface AccountStateType extends NavUserInfo {
  loading: boolean;
  err?: any;
}

const initialState: AccountStateType = {
  nickname: "",
  userId: 0,
  profileImg: null,
  loading: false,
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
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        err: action.payload,
      };

    default:
      return initialState;
  }
};

export default accountReducer;

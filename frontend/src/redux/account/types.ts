import { userLogin } from "./actions";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";
export const SET_PROFILE_IMG = "SET_PROFILE_IMG";
export const SET_USER_INFO = "SET_USER_INFO";

export type AccountAction = ReturnType<typeof userLogin>;

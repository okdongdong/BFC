import { userLogin } from "./actions";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export type AccountAction = ReturnType<typeof userLogin>;

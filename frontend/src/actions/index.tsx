// 이곳에서는 actions정의
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const updateUserInfo = (userInfo: object) => ({
  type: UPDATE_USER_INFO,
  userInfo,
});

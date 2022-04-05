import { AnyAction } from "redux";
import { SetProfileData } from "../../types/profile";
import { SET_PROFILE_DATA } from "./types";

const initProfileData: SetProfileData = {
  userId: 0,
  username: "",
  nickname: "",
  profileImg: "",
  isFollowing: false,
  followingCnt: 0,
  followerCnt: 0,
  interestList: [],
  myList: [],
  likeList: [],
};

const profileReducer = (
  state: SetProfileData = initProfileData,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;

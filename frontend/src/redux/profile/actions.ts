import { SetProfileData } from "../../types/profile";
import { SET_PROFILE_DATA } from "./types";

export const setProfileData = (profileData: SetProfileData) => {
  return {
    type: SET_PROFILE_DATA,
    payload: profileData,
  };
};

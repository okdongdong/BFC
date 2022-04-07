import {
  SetFullCourseData,
  SetPlaceData,
  SetReview,
  SetReviewList,
} from "../../types/detail";
import { SET_FULLCOURSE_DATA, SET_PLACE_DATA, SET_REVIEW_LIST } from "./type";

export const setPlaceData = (profileData: SetPlaceData) => {
  return {
    type: SET_PLACE_DATA,
    payload: profileData,
  };
};
export const setReviewList = (reviewListData: SetReview[]) => {
  return {
    type: SET_REVIEW_LIST,
    payload: reviewListData,
  };
};
export const setFullCourseData = (fullCourseData: SetFullCourseData) => {
  return {
    type: SET_FULLCOURSE_DATA,
    payload: fullCourseData,
  };
};

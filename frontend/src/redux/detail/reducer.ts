import { AnyAction } from "redux";
import {
  SetFullCourseData,
  SetPlaceData,
  SetReview,
  SetReviewList,
} from "../../types/detail";
import { SET_FULLCOURSE_DATA, SET_PLACE_DATA, SET_REVIEW_LIST } from "./type";

const initPlaceData: SetPlaceData = {
  placeId: 0,
  name: "",
  info: "",
  openTime: [],
  lat: 0,
  lon: 0,
  address: "",
  category: false,
  phone: "",
  label: "",
  station: "",
  averageScore: 0,
  thumbnail: "",
  menus: [],
};
const initReviewData: SetReview = {
  reviewId: 0,
  content: "",
  userId: 0,
  nickname: "",
  profileImg: "",
  postedAt: "",
  updatedAt: "",
  index: 0,
};
const initReviewList: SetReviewList = {
  reviewList: [],
};
const initFullCourseData: SetFullCourseData = {
  fullCourseId: 0,
  title: "",
  isPublic: false,
  view: 0,
  startedOn: "",
  finishedOn: "",
  scheduleDetailList: [],
  likeCnt: 0,
};
const initContent: string = "";

export const placeReducer = (
  state: SetPlaceData = initPlaceData,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_PLACE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const reviewListReducer = (
  state: SetReviewList = initReviewList,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_REVIEW_LIST:
      return {
        ...state,
        reviewList: [...action.payload],
      };

    default:
      return state;
  }
};
export const fullCourseReducer = (
  state: SetFullCourseData = initFullCourseData,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_FULLCOURSE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

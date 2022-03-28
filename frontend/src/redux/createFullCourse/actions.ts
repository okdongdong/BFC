// import axios from "axios";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { Dispatch } from "redux";
import { CreateFullCourseDnd } from "./createFullCourseReducer";
import { MOVE_CARD, CREATE_FULL_COURSE, SET_FULL_COURSE_DATE } from "./types";

export const moveCard = (newState: CreateFullCourseDnd) => {
  return {
    type: MOVE_CARD,
    payload: newState,
  };
};

export const setFullCourseDate = (newDate: DateRange<Date>) => {
  return {
    type: SET_FULL_COURSE_DATE,
    payload: newDate,
  };
};
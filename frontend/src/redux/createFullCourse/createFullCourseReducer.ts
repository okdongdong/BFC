import { AnyAction } from "redux";
import deepcopy from "deepcopy";

import {
  MOVE_CARD,
  SET_FULL_COURSE_DATE,
  FullCourseListProps,
  CREATE_FULL_COURSE_SUCCESS,
  ADD_CUSTOM_PLACE,
  DELETE_CARD,
  RESET_FULL_COURSE,
  SET_FULL_COURSE_INFO,
} from "./types";

export interface CreateFullCourseDnd {
  fullCourseList: FullCourseListProps;
  fullCourseDate: Array<string | null>;
  fullCourseId?: number;
  fullCourseTitle?: string;
}

const initialState: CreateFullCourseDnd = {
  fullCourseId: 0,
  fullCourseTitle: "",
  fullCourseList: [[]],
  fullCourseDate: [null, null],
};

const createFullCourseReducer = (
  state: CreateFullCourseDnd = initialState,
  action: AnyAction
) => {
  const newState = deepcopy(state);
  switch (action.type) {
    // 스케줄 DND에서 카드 옮길 때
    case MOVE_CARD:
      console.log(action.payload);
      console.log("실행이 안되나?");

      const newFullCourseList = deepcopy(action.payload);
      return {
        ...newState,
        fullCourseList: newFullCourseList,
      };

    case SET_FULL_COURSE_INFO:
      return { ...action.payload };

    case DELETE_CARD:
      newState.fullCourseList[action.payload.day].splice(
        action.payload.sequence,
        1
      );

      return { ...newState };

    case RESET_FULL_COURSE:
      console.log("리셋");
      return { ...initialState };

    // 풀코스 날짜 설정
    case SET_FULL_COURSE_DATE:
      const [startDate, endDate] = action.payload;

      if (startDate !== null && endDate !== null) {
        const diffDate =
          new Date(startDate).getTime() - new Date(endDate).getTime();
        const dayLength = Math.abs(diffDate / (1000 * 3600 * 24)) + 1;
        const newFullCourseList: any = [];
        for (
          let i = 0;
          i < Math.min(state.fullCourseList.length, dayLength);
          i++
        ) {
          newFullCourseList.push([...state.fullCourseList[i]]);
        }
        if (state.fullCourseList.length < dayLength) {
          for (let i = state.fullCourseList.length; i < dayLength; i++) {
            newFullCourseList.push([]);
          }
        } else {
          for (let i = dayLength; i < state.fullCourseList.length; i++) {
            newFullCourseList[dayLength - 1] = [
              ...newFullCourseList[dayLength - 1],
              ...state.fullCourseList[i],
            ];
          }
        }
        return {
          ...state,
          fullCourseList: newFullCourseList,
          fullCourseDate: [...action.payload],
        };
      }
      return {
        ...state,
        fullCourseDate: [...action.payload],
      };

    case ADD_CUSTOM_PLACE:
      newState.fullCourseList[action.payload.day].push(action.payload.schedule);
      return {
        ...newState,
      };

    case CREATE_FULL_COURSE_SUCCESS:
      return {
        ...newState,
        fullCourseId: action.payload,
      };

    default:
      return state;
  }
};

export default createFullCourseReducer;

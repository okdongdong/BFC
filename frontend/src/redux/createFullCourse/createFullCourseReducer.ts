import { AnyAction } from "redux";
import { placeList } from "../../assets/dummyData/dummyData";
import { PlaceCardProps } from "../../types/main";
import deepcopy from "deepcopy";

import {
  MOVE_CARD,
  SET_FULL_COURSE_DATE,
  FullCourseListProps,
  CREATE_CARD,
  FULL_COURSE_REQUEST,
  CREATE_FULL_COURSE_SUCCESS,
  CREATE_FULL_COURSE_FAILURE,
  ERROR_CONTROL,
} from "./types";

export interface CreateFullCourseDnd {
  fullCourseList: FullCourseListProps;
  fullCourseDate: Array<string | null>;
  fullCourseId?: number;
  nowLoading?: boolean;
  nowError?: boolean;
  errorMessage?: string;
}

const plt: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];
const plt2: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];

placeList.map((place: PlaceCardProps) =>
  plt.push({ id: `place-${place.placeId}`, content: place })
);
placeList.map((place: PlaceCardProps) =>
  plt2.push({
    id: `place2-${place.placeId}+${new Date().getTime()}`,
    content: place,
  })
);

const initialState: CreateFullCourseDnd = {
  fullCourseList: [[...plt2]],
  fullCourseDate: [null, null],
  nowLoading: false,
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
      const newFullCourseList = deepcopy(action.payload);
      return {
        ...newState,
        nowLoading: false,
        fullCourseList: newFullCourseList,
      };

    case CREATE_CARD:
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
          nowLoading: false,
          fullCourseList: newFullCourseList,
          fullCourseDate: [...action.payload],
        };
      }
      return {
        ...state,
        fullCourseDate: [...action.payload],
      };

    // 로딩중..
    case FULL_COURSE_REQUEST:
      return {
        ...newState,
        nowLoading: true,
      };

    case CREATE_FULL_COURSE_SUCCESS:
      return {
        ...newState,
        nowLoading: false,
        fullCourseId: action.payload,
      };

    case CREATE_FULL_COURSE_FAILURE:
      return {
        ...newState,
        nowLoading: false,
        nowError: true,
        errorMessage: action.payload,
      };

    case ERROR_CONTROL:
      return {
        ...newState,
        nowError: action.payload,
      };

    default:
      return state;
  }
};

export default createFullCourseReducer;

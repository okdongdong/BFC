import { AnyAction } from "redux";
import {
  ADD_PAGE,
  SET_FINISHED,
  SET_PAGE,
  SET_SELECTED_SCHEDULE_ID,
} from "./types";

export interface ScheduleReducer {
  selectedScheduleId: number;
  page: number;
  finished: boolean;
}

const initialState: ScheduleReducer = {
  selectedScheduleId: 0,
  page: 0,
  finished: false,
};

const scheduleReducer = (
  state: ScheduleReducer = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    // 스케줄 DND에서 카드 옮길 때
    case SET_SELECTED_SCHEDULE_ID:
      return {
        ...state,
        page: 0,
        finished: false,
        selectedScheduleId: action.payload,
      };

    // 인피니티 요청할 페이지
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    // 페이지를 지정한 만큼 추가
    case ADD_PAGE:
      return {
        ...state,
        page: state.page + action.payload,
      };

    // 인피니티가 끝났는지 확인
    case SET_FINISHED:
      return {
        ...state,
        finished: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleReducer;

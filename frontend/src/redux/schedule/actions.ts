import {
  ADD_PAGE,
  SET_FINISHED,
  SET_PAGE,
  SET_SELECTED_SCHEDULE_ID,
} from "./types";

export const setSelectedScheduleId = (scheduleId: number) => {
  return {
    type: SET_SELECTED_SCHEDULE_ID,
    payload: scheduleId,
  };
};

export const setPage = (page: number) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};
export const addPage = (page: number) => {
  return {
    type: ADD_PAGE,
    payload: page,
  };
};

export const setFinished = (finished: boolean) => {
  return {
    type: SET_FINISHED,
    payload: finished,
  };
};

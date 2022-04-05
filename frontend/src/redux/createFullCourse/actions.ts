// import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import {
  AddCustomPlaceProps,
  ADD_CUSTOM_PLACE,
  CreateFullCourseRequestData,
  CreateNewScheduleProps,
  CreateScheduleRequestDataProps,
  CREATE_CARD,
  CREATE_FULL_COURSE_SUCCESS,
  CustomPlaceInfoProps,
  DeleteScheduleProps,
  FullCourseListProps,
  MOVE_CARD,
  SET_FULL_COURSE_DATE,
  UpdateScheduleProps,
  UpdateScheduleRequestDataProps,
} from "./types";
import defaultImg from "../../assets/img/defaultImg.png";
import {
  errorControl,
  loadingControl,
  setErrorMessage,
  setNowError,
  setNowLoading,
} from "../baseInfo/actions";

export const moveCard = (newState: FullCourseListProps) => {
  return {
    type: MOVE_CARD,
    payload: newState,
  };
};

export const createCard = (newState: FullCourseListProps) => {
  return {
    type: CREATE_CARD,
    payload: newState,
  };
};

// 나만의 장소 일정에 추가
const addCustomPlace = (newState: AddCustomPlaceProps) => {
  return {
    type: ADD_CUSTOM_PLACE,
    payload: newState,
  };
};

export const setFullCourseDate = (newDate: Array<string | null>) => {
  return {
    type: SET_FULL_COURSE_DATE,
    payload: newDate,
  };
};

export const createFullCourseSuccess = (fullCourseId: number) => {
  return {
    type: CREATE_FULL_COURSE_SUCCESS,
    payload: fullCourseId,
  };
};

// 새로운 풀코스 생성
export const creatNewFullCourse = (
  fullCourseInfo: CreateFullCourseRequestData
) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    console.log("fullCourseInfo", fullCourseInfo);

    try {
      const res = await customAxios({
        method: "POST",
        url: `/fullCourse`,
        data: fullCourseInfo,
      });

      const fullCourseId = res.data.fullCourseId;
      dispatch(createFullCourseSuccess(fullCourseId));
      console.log(res);
    } catch (e) {
      errorControl(dispatch,"풀코스 생성실패..")
      
      console.log(e);
    }
    loadingControl(dispatch, false);
  };
};

// 새로운 스케줄(카드) 생성
export const createNewSchedule = ({
  newScheduleListInfo,
  day,
  sequence,
  fullCourseId,
}: CreateNewScheduleProps) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);
    console.log("실행이 안되나아아아?");

    const data: CreateScheduleRequestDataProps = {
      placeId: newScheduleListInfo[day][sequence].content.placeId,
      day: day + 1,
      sequence: sequence + 1,
    };

    console.log("data", data);

    try {
      const res = await customAxios({
        method: "post",
        url: `/schedule/${fullCourseId}`,
        data: data,
      });

      console.log(res);
      newScheduleListInfo[day][sequence].content = {
        ...newScheduleListInfo[day][sequence].content,
        scheduleId: res.data.scheduleId,
      };
      console.log(newScheduleListInfo);
      dispatch(moveCard(newScheduleListInfo));

      //
    } catch (err: any) {
      console.log(err);
      console.log(err.response);
      errorControl(dispatch,"스케줄 추가 실패 ㅠ.ㅠ")
      
    }
    loadingControl(dispatch, false);
  };
};

// 스케줄(카드) 이동
export const updateSchedule = ({
  updateScheduleListInfo,
  day,
  day2,
  sequence,
  sequence2,
  fullCourseId,
  placeId,
  scheduleId,
}: UpdateScheduleProps) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    const data: UpdateScheduleRequestDataProps = {
      placeId: placeId,
      scheduleId: scheduleId,
      dayBefore: day + 1,
      dayAfter: day2 + 1,
      sequenceBefore: sequence + 1,
      sequenceAfter: sequence2 + 1,
    };

    console.log("dataaaaaaaaaaa", data);

    try {
      const res = await customAxios({
        method: "put",
        url: `/schedule/${fullCourseId}`,
        data: data,
      });

      console.log(res);

      // 결과받으면 새로운 카드 추가
      dispatch(moveCard(updateScheduleListInfo));

      //
    } catch (err) {
      console.log(err);
       
      errorControl(dispatch,"스케줄 변경 실패!!")
      
    }
    loadingControl(dispatch, false);
  };
};

// 스케줄(카드) 삭제
export const deleteSchedule = ({
  deleteScheduleListInfo,
  day,
  sequence,
  fullCourseId,
}: DeleteScheduleProps) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    const data: CreateScheduleRequestDataProps = {
      placeId: deleteScheduleListInfo[day][sequence].content.placeId,
      scheduleId: deleteScheduleListInfo[day][sequence].content.scheduleId,
      day: day + 1,
      sequence: sequence + 1,
    };

    try {
      const res = await customAxios({
        method: "delete",
        url: `/schedule/${fullCourseId}`,
        data: data,
      });

      console.log(res);
      // 결과받으면 새로운 카드 추가
      dispatch(moveCard(deleteScheduleListInfo));

      //
    } catch (err) {
      errorControl(dispatch,"스케줄 삭제 실패!!")
      
    }
    loadingControl(dispatch, false);
  };
};

// 새로운 나만의 장소 생성
export const createCustomPlace = (customPlaceInfo: CustomPlaceInfoProps) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    try {
      const res = await customAxios({ method: "post", data: customPlaceInfo });

      const newContent = {
        scheduleId: res.data.scheduleId,
        name: customPlaceInfo.name,
        address: customPlaceInfo.address,
        thumbnail: defaultImg,
      };
      const newSchedule = {
        id: `customPlace-${new Date().getTime()}`,
        content: newContent,
      };

      const newState = { day: customPlaceInfo.day, schedule: newSchedule };
      dispatch(addCustomPlace(newState));
    } catch (e) {
      console.log(e);
      errorControl(dispatch,"나만의 장소 추가 실패")
      
    }
    loadingControl(dispatch, false);
  };
};

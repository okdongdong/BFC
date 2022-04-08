// import axios from "axios";
import { Dispatch } from "redux";
import { customAxios, customAxiosDjango } from "../../lib/customAxios";
import {
  AddCustomPlaceProps,
  ADD_CUSTOM_PLACE,
  CreateFullCourseRequestData,
  CreateNewScheduleProps,
  CreateScheduleRequestDataProps,
  CREATE_FULL_COURSE_SUCCESS,
  CustomPlaceInfoProps,
  DELETE_CARD,
  FullCourseListProps,
  MOVE_CARD,
  RESET_FULL_COURSE,
  SET_FULL_COURSE_DATE,
  SET_FULL_COURSE_INFO,
  UpdateScheduleProps,
  UpdateScheduleRequestDataProps,
} from "./types";
import logoWithText from "../../assets/img/logo_with_text.png";
import { errorControl, loadingControl } from "../baseInfo/actions";
import { CreateFullCourseDnd } from "./createFullCourseReducer";

export const moveCard = (newState: FullCourseListProps) => {
  return {
    type: MOVE_CARD,
    payload: newState,
  };
};

export const setFullCourseInfo = (newState: CreateFullCourseDnd) => {
  return {
    type: SET_FULL_COURSE_INFO,
    payload: newState,
  };
};

const deleteCard = (delInfo: { day: number; sequence: number }) => {
  return {
    type: DELETE_CARD,
    payload: delInfo,
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

export const resetFullCourse = () => {
  return {
    type: RESET_FULL_COURSE,
  };
};

// 새로운 풀코스 생성
export const creatNewFullCourse = (
  fullCourseInfo: CreateFullCourseRequestData
) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    try {
      const res = await customAxios({
        method: "POST",
        url: `/fullCourse`,
        data: fullCourseInfo,
      });

      const fullCourseId = res.data.fullCourseId;
      dispatch(createFullCourseSuccess(fullCourseId));
      // 새로운 풀코스를 생성한 뒤 Django 서버로 추가요청
      const res2 = await customAxiosDjango({
        method: "get",
        url: `/recommend/${fullCourseId}/${fullCourseInfo.userId}`,
      });
    } catch (e) {
      errorControl(dispatch, "설문기반 추천 연동 실패..");
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

    const data: CreateScheduleRequestDataProps = {
      placeId: newScheduleListInfo[day][sequence].content.placeId,
      day: day + 1,
      sequence: sequence + 1,
    };

    try {
      const res = await customAxios({
        method: "post",
        url: `/schedule/${fullCourseId}`,
        data: data,
      });

      newScheduleListInfo[day][sequence].content = {
        ...newScheduleListInfo[day][sequence].content,
        scheduleId: res.data.scheduleId,
      };
      dispatch(moveCard(newScheduleListInfo));

      //
    } catch (err: any) {
      errorControl(dispatch, "스케줄 추가 실패 ㅠ.ㅠ");
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

    try {
      const res = await customAxios({
        method: "put",
        url: `/schedule/${fullCourseId}`,
        data: data,
      });

      // 결과받으면 새로운 카드 추가
      dispatch(moveCard(updateScheduleListInfo));

      //
    } catch (err) {
      errorControl(dispatch, "스케줄 변경 실패!!");
    }
    loadingControl(dispatch, false);
  };
};

// 스케줄(카드) 삭제
export const deleteSchedule = ({
  day,
  sequence,
  scheduleId,
}: {
  day: number;
  sequence: number;
  scheduleId: number;
}) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    const data: { day: number; sequence: number } = {
      day: day,
      sequence: sequence,
    };

    try {
      const res = await customAxios({
        method: "delete",
        url: `/schedule/${scheduleId}`,
      });

      // 결과받으면 새로운 카드 추가
      dispatch(deleteCard(data));

      //
    } catch (err) {
      errorControl(dispatch, "스케줄 삭제 실패!!");
    }

    loadingControl(dispatch, false);
  };
};

// 새로운 나만의 장소 생성
export const createCustomPlace = (customPlaceInfo: CustomPlaceInfoProps) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    try {
      const res = await customAxios({
        method: "post",
        url: "/customPlace",
        data: customPlaceInfo,
      });

      const newContent = {
        scheduleId: res.data.scheduleId,
        name: customPlaceInfo.name,
        address: customPlaceInfo.address,
        thumbnail: logoWithText,
        lat: customPlaceInfo.lat,
        lng: customPlaceInfo.lon,
      };
      const newSchedule = {
        id: `customPlace-${new Date().getTime()}-${Math.random()}`,
        content: newContent,
      };

      const newState = { day: customPlaceInfo.day - 1, schedule: newSchedule };
      dispatch(addCustomPlace(newState));
    } catch (e) {
      errorControl(dispatch, "나만의 장소 추가 실패");
    }
    loadingControl(dispatch, false);
  };
};

// 풀코스 정보조회
export const getFullCourseInfo = (fullCourseId: number) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    try {
      const res = await customAxios({
        method: "get",
        url: `/fullCourse/${fullCourseId}`,
      });

      const newState: CreateFullCourseDnd = {
        fullCourseTitle: res.data.title,
        fullCourseId: res.data.fullCourseId,
        fullCourseDate: [res.data.startedOn, res.data.finishedOn],
        fullCourseList: [],
      };

      const diffDate =
        new Date(res.data.startedOn).getTime() -
        new Date(res.data.finishedOn).getTime();
      const dayLength = Math.abs(diffDate / (1000 * 3600 * 24)) + 1;

      while (dayLength > newState.fullCourseList.length) {
        newState.fullCourseList.push([]);
      }
      if (res.data.scheduleDetailList.length > 0) {
        res.data.scheduleDetailList.map((scheduleDetail: any, idx: number) => {
          newState.fullCourseList[scheduleDetail.day - 1].push({
            scheduleId: scheduleDetail.scheduleId,
            id: `shedule-${idx}-${new Date().getTime()}-${Math.random()}`,
            content: {
              scheduleId: scheduleDetail.scheduleId,
              thumbnail: scheduleDetail.thumbnail,
              averageScore: scheduleDetail.averageScore,
              category:
                scheduleDetail.customPlaceId === null ? undefined : true, // 인지 관광지인지 구별 => 1: 음식점, 0: 관광지라 가정
              placeId: scheduleDetail.placeId,
              name: scheduleDetail.name,
              address: scheduleDetail.address,
              lat: scheduleDetail.lat,
              lng: scheduleDetail.lon,
            },
          });
        });
      }
      dispatch(setFullCourseInfo(newState));
    } catch (e) {
      errorControl(dispatch, "풀코스 정보조회 실패");
    }
    loadingControl(dispatch, false);
  };
};

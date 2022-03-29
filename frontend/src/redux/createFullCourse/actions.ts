// import axios from "axios";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import { CreateFullCourseDnd } from "./createFullCourseReducer";
import {
  CreateFullCourseProps,
  CreateFullCourseRequestData,
  CreateScheduleRequestDataProps,
  CREATE_CARD,
  CREATE_FULL_COURSE_FAILURE,
  CREATE_FULL_COURSE_SUCCESS,
  CustomInstance,
  FullCourseDndCardProps,
  FullCourseListProps,
  FULL_COURSE_REQUEST,
  MOVE_CARD,
  SET_FULL_COURSE_DATE,
} from "./types";

export const moveCard = (newState: Array<CreateFullCourseDnd>) => {
  return {
    type: MOVE_CARD,
    payload: newState,
  };
};

export const createCard = (newState: Array<CreateFullCourseDnd>) => {
  return {
    type: CREATE_CARD,
    payload: newState,
  };
};

export const setFullCourseDate = (newDate: DateRange<Date>) => {
  return {
    type: SET_FULL_COURSE_DATE,
    payload: newDate,
  };
};

export const fullCourseRequest = () => {
  return {
    type: FULL_COURSE_REQUEST,
  };
};

export const createFullCourseSuccess = (fullCourseId: number) => {
  return {
    type: CREATE_FULL_COURSE_SUCCESS,
    payload: fullCourseId,
  };
};

export const createFullCourseFailure = (state: boolean) => {
  return {
    type: CREATE_FULL_COURSE_FAILURE,
    payload: state,
  };
};

// 새로운 풀코스 생성
export const creatNewFullCourse = (
  fullCourseInfo: CreateFullCourseRequestData
) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    dispatch(fullCourseRequest());

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
      dispatch(createFullCourseFailure(true));
      console.log(e);
    }
  };
};

// export const creatNewSchedule = (
//   newCardInfo: FullCourseDndCardProps & { day: number; sequence: number }
// ) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(fullCourseRequest());

//     const data: CreateScheduleRequestDataProps = {
//       placeId: newCardInfo.content.placeId,
//       day: newCardInfo.day,
//       sequence: newCardInfo.sequence,
//     };

//     try {
//       const res = await axios({
//         method: "post",
//         url: `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/${fullCourseId}/place`,
//         data: data,
//       });

//       console.log(res);

//       // 결과받으면 새로운 카드 추가
//       // 그냥 moveCard로 사용해도 될듯
//       dispatch(moveCard(newUserInfo));

//       //       // 로그인 성공시 메인페이지로 이동
//     } catch (err) {
//       console.log(err);
//       dispatch(userLoginFailure(err));
//     }
//   };
// };

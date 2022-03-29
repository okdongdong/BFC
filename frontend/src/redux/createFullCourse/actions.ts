// import axios from "axios";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { CreateFullCourseDnd } from "./createFullCourseReducer";
import {
  CreateScheduleRequestDataProps,
  CREATE_CARD,
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

const createCard = (newState: Array<CreateFullCourseDnd>) => {
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

const fullCourseRequest = () => {
  return {
    type: FULL_COURSE_REQUEST,
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

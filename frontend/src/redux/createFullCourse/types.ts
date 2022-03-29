import { AxiosInstance } from "axios";
import { PlaceCardProps } from "../../types/main";

// 스케줄 이동
export const MOVE_CARD = "MOVE_CARD";

// 새 스케줄 생성
export const CREATE_CARD = "CREATE_CARD";

// 요청보낼때 로딩화면 띄워주기 위한 요청
export const FULL_COURSE_REQUEST = "FULL_COURSE_REQUEST";

// 풀코스 일정 세팅
export const SET_FULL_COURSE_DATE = "SET_FULL_COURSE_DATE";

// 사전조사 후 풀코스를 새로 만드는 요청
export const CREATE_FULL_COURSE_SUCCESS = "CREATE_FULL_COURSE_SUCCESS";
export const CREATE_FULL_COURSE_FAILURE = "CREATE_FULL_COURSE_FAILURE";

// axios요청에서 headers의 타입을 지정해줌
export interface CustomInstance extends AxiosInstance {
  headers: {
    Authorization: string;
  };
}

// 풀코스 생성시 보내줄 데이터
export interface CreateFullCourseRequestData {
  title: string;
  isPublic: boolean;
  startedOn: string;
  finishedOn: string;
  wishFoodKeywords: Array<string>;
  wishPlaceKeywords: Array<string>;
}



// 스케줄 생성시 보내줄 데이터
export interface CreateScheduleRequestDataProps {
  placeId: number;
  day: number;
  sequence: number;
}

export interface FullCourseDndCardProps {
  id: string;
  content: PlaceCardProps;
}

export type FullCourseListProps = Array<
  Array<FullCourseDndCardProps> | Array<null>
>;

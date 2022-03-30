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

// 에러관리
export const ERROR_CONTROL = "ERROR_CONTROL";

// 풀코스 생성시 보내줄 데이터
export interface CreateFullCourseRequestData {
  title: string;
  isPublic: boolean;
  startedOn: string | null;
  finishedOn: string | null;
  wishFoodKeywords: Array<string>;
  wishPlaceKeywords: Array<string>;
}

// 스케줄 생성시 보내줄 데이터
export interface CreateScheduleRequestDataProps {
  scheduleId?: number;
  placeId: number;
  day?: number;
  sequence?: number;
}

export interface UpdateScheduleRequestDataProps
  extends CreateScheduleRequestDataProps {
  dayBefore: number;
  dayAfter: number;
  sequenceBefore: number;
  sequenceAfter: number;
}

interface ScheduleCardProps extends PlaceCardProps {
  scheduleId?: number;
}

export interface FullCourseDndCardProps {
  scheduleId?: number;
  id: string;
  content: ScheduleCardProps;
}

// 스케줄 기본
interface ScheduleProps {
  scheduleId?: number;
  day: number;
  sequence: number;
  fullCourseId: number;
}

// 스케줄 생성
export interface CreateNewScheduleProps extends ScheduleProps {
  newScheduleListInfo: FullCourseListProps;
}

// 스케줄 변경
export interface UpdateScheduleProps extends ScheduleProps {
  placeId: number;
  scheduleId: number;
  updateScheduleListInfo: FullCourseListProps;
  day2: number;
  sequence2: number;
}

// 스케줄 삭제
export interface DeleteScheduleProps extends ScheduleProps {
  deleteScheduleListInfo: FullCourseListProps;
}

export type FullCourseListProps = Array<Array<FullCourseDndCardProps>>;

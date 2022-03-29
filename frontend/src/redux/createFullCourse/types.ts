import { PlaceCardProps } from "../../types/main";

export const MOVE_CARD = "MOVE_CARD";
export const CREATE_CARD = "CREATE_CARD";

export const CREATE_FULL_COURSE = "CREATE_FULL_COURSE";

export const SET_FULL_COURSE_DATE = "SET_FULL_COURSE_DATE";

export const FULL_COURSE_REQUEST = "FULL_COURSE_REQUEST";

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

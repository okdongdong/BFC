export interface SetPlaceData {
  placeId: number;
  name: string;
  info: string;
  openTime: Array<string>;
  lat: number;
  lon: number;
  address: string;
  category: boolean;
  phone: string;
  label: string;
  station: string;
  averageScore: number;
  thumbnail: string | null;
  menus?: Array<string>;
}
export interface SetReview {
  index: number;
  reviewId: number;
  content: string;
  userId: number;
  nickname: string;
  profileImg: string;
  postedAt: string;
  updatedAt: string;
}
export interface SetReviewList {
  reviewList: SetReview[];
  [key: string]: any;
}
export interface ScheduleData {
  scheduleId: number;
  day: number;
  sequence: number;
  memo: string | null;
  customPlaceId: number | null;
  placeId: number;
  name: string;
  address: string;
  lat: number;
  lon: number;
  thumbnail: string;
}
export interface SetFullCourseData {
  fullCourseId: number;
  title: string;
  isPublic: boolean;
  view: number;
  startedOn: string;
  finishedOn: string;
  scheduleDetailList: ScheduleData[];
  likeCnt: null | number;
  userId: number;
  nickname: string;
  profileImg: string;
}

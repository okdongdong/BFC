export interface PlaceCardProps {
  scheduleId?: number;
  placeId: number;
  lat?: number;
  lng?: number;
  name: string;
  thumbnail: string;
  address?: string;
  averageScore: number;
  category?: boolean; // 음식점인지 관광지인지 구별 => 1: 음식점, 0: 관광지라 가정
  keywords?: string[];
  label?: string;
}

export interface CustomPlaceCardProps {
  placeId: number;
  name: string;
  thumbnail: string;
  address: string;
}

export interface PlaceCardListProps {
  title?: string;
  placeList: PlaceCardProps[];
}

export interface FullCourseProps {
  fullCourseId: number;
  title: string;
  views: number;
  startedOn: string;
  finishedOn: string;
  thumbnailList: string[];
}

export interface FullCourseListProps {
  title?: string;
  fullCourseList: FullCourseProps[];
}

export interface MyFullCourseContentDayProps {
  courseDate: string; // 일정날짜
  day: number;
  placeList: Array<{ name: string; order: number }>;
}

export interface FullCourseDetailProps {
  fullCourseId?: number;
  title: string;
  views?: number;
  startedOn: string;
  finishedOn: string;
  thumbnailList: string[];
  dayPlaceList: MyFullCourseContentDayProps[];
}

export interface ScheduleDetail {
  address: string;
  customPlaceId: number | null;
  day: number;
  lat: number;
  lon: number;
  memo: string;
  name: string;
  placeId: number | null;
  scheduleId: number;
  sequence: number;
}

export interface FullCourseContentProps {
  fullCourseId?: number;
  title: string;
  startedOn: string;
  finishedOn: string;
  thumbnailList: string[];
  scheduleDetailList?: Array<ScheduleDetail | null>;
}

export interface FullCourseDetailListProps {
  fullCourseDetailList: FullCourseContentProps[];
}

export interface PlaceCardProps {
  placeId: number;
  name: string;
  thumbnail: string;
  address: string;
  averageScore: number;
  category: number; // 음식점인지 관광지인지 구별 => 1: 음식점, 0: 관광지라 가정
  keywords: string[];
}

export interface PlaceCardListProps {
  title?: string;
  placeList: PlaceCardProps[];
}

export interface FullCourseProps {
  fullCourseId: number;
  title: string;
  views: number;
  startOn: Date;
  finishedOn: Date;
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
  fullCourseId: number;
  title: string;
  views?: number;
  startOn: Date;
  finishedOn: Date;
  thumbnailList: string[];
  dayPlaceList: MyFullCourseContentDayProps[];
}

export interface FullCourseDetailListProps {
  fullCourseDetailList: FullCourseDetailProps[];
}

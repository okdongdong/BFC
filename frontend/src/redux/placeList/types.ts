// 장소목록 불러오기
export const GET_PLACE_LIST = "GET_PLACE_LIST";
export const SET_PLACE_LIST = "GET_PLACE_LIST";

// 거리기반 장소목록 불러오기
export const SET_PLACE_LIST_WITH_DISTANCE = "SET_PLACE_LIST_WITH_DISTANCE";
export const RESET_PLACE_LIST_WITH_DISTANCE = "RESET_PLACE_LIST_WITH_DISTANCE";

// 설문기반 장소목록 불러오기
export const SET_PLACE_LIST_WITH_SURVEY = "SET_PLACE_LIST_WITH_SURVEY";
export const RESET_PLACE_LIST_WITH_SURVEY = "RESET_PLACE_LIST_WITH_SURVEY";

// 장소이름으로 장소검색
export const SET_SEARCH_PLACE_LIST = "SET_SEARCH_PLACE_LIST";
export const RESET_SEARCH_PLACE_LIST = "RESET_SEARCH_PLACE_LIST";

// 장소리스트 요청시 필요한 데이터
export interface PlaceListInfoForGet {
  distance: number; // 미터 단위
  scheduleId: number;
  page: number;
  size: number;
}
export interface SurveyPlaceListInfoForGet {
  userId: number;
  page: number;
  size: number;
}

export interface PlaceInfo {
  placeId: number;
  lat: number;
  lng: number;
  name: string;
  thumbnail: string;
  address: string;
  averageScore: number;
  scoreCount: number;
  category: boolean;
  keywords?: string[];
}
export interface PlaceInfoData {
  placeId: number;
  lat: number;
  lon: number;
  name: string;
  thumbnail: string;
  address: string;
  averageScore: number;
  scoreCount: number;
  category: boolean;
  keywords?: string[];
}

export interface PlaceCard {
  id: string;
  content: PlaceInfo;
}

export type PlaceCardList = PlaceCard[] | null[];

// 장소 검색시 사용할 데이터
export interface PlaceSearchInfo {
  name: string; // placeName
  page?: number;
  size?: number;
}

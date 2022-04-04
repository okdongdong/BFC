// 장소목록 불러오기
export const GET_PLACE_LIST = "GET_PLACE_LIST";
export const SET_PLACE_LIST = "GET_PLACE_LIST";

// 거리기반 장소목록 불러오기
export const GET_PLACE_LIST_WITH_DISTANCE = "GET_PLACE_LIST_WITH_DISTANCE";
export const SET_PLACE_LIST_WITH_DISTANCE = "SET_PLACE_LIST_WITH_DISTANCE";

// 장소이름으로 장소검색
export const GET_SEARCH_PLACE_LIST = "GET_SEARCH_PLACE_LIST";
export const SET_SEARCH_PLACE_LIST = "SET_SEARCH_PLACE_LIST";

// 요청 관련
export const PLACE_LIST_REQUEST = "PLACE_LIST_REQUEST";
export const PLACE_LIST_SUCCESS = "PLACE_LIST_SUCCESS";
export const PLACE_LIST_FAILURE = "PLACE_LIST_FAILURE";

// 로딩 & 에러처리
export const PLACE_LIST_LOADING_CONTROL = "PLACE_LIST_LOADING_CONTROL";
export const PLACE_LIST_ERROR_CONTROL = "PLACE_LIST_ERROR_CONTROL";

// 장소리스트 요청시 필요한 데이터
export interface PlaceListInfoForGet {
  distance: number; // 미터 단위
  placeId: number;
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
  category: number;
  keywords: string[];
}

export interface PlaceCard {
  id: string;
  content: PlaceInfo;
}

export type PlaceCardList = PlaceCard[] | null[];

// 장소 검색시 사용할 데이터
export interface PlaceSearchInfo {
  placeName: string;
  page: number;
  size: number;
}

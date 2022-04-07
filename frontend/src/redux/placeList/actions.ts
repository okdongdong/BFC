// import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import {
  PlaceListInfoForGet,
  PlaceCardList,
  PlaceCard,
  SET_PLACE_LIST,
  SET_PLACE_LIST_WITH_DISTANCE,
  SET_SEARCH_PLACE_LIST,
  PlaceSearchInfo,
  PlaceInfoData,
  RESET_PLACE_LIST_WITH_DISTANCE,
  RESET_SEARCH_PLACE_LIST,
  RESET_PLACE_LIST_WITH_SURVEY,
  SurveyPlaceListInfoForGet,
  SET_PLACE_LIST_WITH_SURVEY,
} from "./types";
import { loadingControl, errorControl } from "../baseInfo/actions";
import { setFinished } from "../schedule/actions";

const setPlaceList = (placeList: PlaceCardList) => {
  return {
    type: SET_PLACE_LIST,
    payload: placeList,
  };
};
const setPlaceListWithDistance = (placeList: PlaceCardList) => {
  return {
    type: SET_PLACE_LIST_WITH_DISTANCE,
    payload: placeList,
  };
};
const setSearchPlaceList = (placeList: PlaceCardList) => {
  return {
    type: SET_SEARCH_PLACE_LIST,
    payload: placeList,
  };
};
const setPlaceListWithSurvey = (placeList: PlaceCardList) => {
  return {
    type: SET_PLACE_LIST_WITH_SURVEY,
    payload: placeList,
  };
};

export const resetPlaceListWithDistance = () => {
  return {
    type: RESET_PLACE_LIST_WITH_DISTANCE,
  };
};

export const resetPlaceListWithSurvey = () => {
  return {
    type: RESET_PLACE_LIST_WITH_SURVEY,
  };
};

export const resetSearchPlaceList = () => {
  return {
    type: RESET_SEARCH_PLACE_LIST,
  };
};

// 거리기반 장소 리스트 받아오기
export const getPlaceListWithDistance = (
  placeListInfoForGet: PlaceListInfoForGet
) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    console.log("PlaceListInfoForGet", placeListInfoForGet);

    try {
      const res = await customAxios({
        method: "get",
        url: `/place/search/near`,
        params: placeListInfoForGet,
      });

      console.log(placeListInfoForGet.page);
      console.log(res.data.totalPages);

      if (placeListInfoForGet.page + 1 >= res.data.totalPages) {
        dispatch(setFinished(true));
        console.log("조회끝");
      }

      const placeListData: PlaceCard[] = [];
      console.log(res);
      res.data.content.map((place: PlaceInfoData, idx: number) => {
        const placeCard: PlaceCard =
          {
            id: `place-${idx}-${new Date()}`,
            content: {
              placeId: place.placeId,
              lat: place.lat,
              lng: place.lon,
              name: place.name,
              thumbnail: place.thumbnail,
              address: place.address,
              averageScore: place.averageScore,
              scoreCount: place.scoreCount,
              category: place.category,
              keywords: place.keywords,
            },
          } || [];

        placeListData.push(placeCard);
      });
      dispatch(setPlaceListWithDistance(placeListData));

      console.log(res);
    } catch (e) {
      errorControl(dispatch, "장소 조회 실패");
      console.log(e);
    }

    loadingControl(dispatch, false);
  };
};

// 설문기반 장소 리스트 받아오기
export const getPlaceListWithSurvey = (
  placeListInfoForGet: SurveyPlaceListInfoForGet
) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    console.log("PlaceListInfoForGet", placeListInfoForGet);

    try {
      const res = await customAxios({
        method: "get",
        url: `fullCourse/${placeListInfoForGet.userId}/surveyRecommend`,
        params: {
          page: placeListInfoForGet.page,
          size: placeListInfoForGet.size,
        },
      });

      console.log(placeListInfoForGet.page);
      console.log(res.data.totalPages);

      if (placeListInfoForGet.page + 1 >= res.data.totalPages) {
        dispatch(setFinished(true));
        console.log("조회끝");
      }

      const placeListData: PlaceCard[] = [];
      console.log(res);
      res.data.content.map((place: PlaceInfoData, idx: number) => {
        const placeCard: PlaceCard =
          {
            id: `place-${idx}-${new Date()}`,
            content: {
              placeId: place.placeId,
              lat: place.lat,
              lng: place.lon,
              name: place.name,
              thumbnail: place.thumbnail,
              address: place.address,
              averageScore: place.averageScore,
              scoreCount: place.scoreCount,
              category: place.category,
              keywords: place.keywords,
            },
          } || [];

        placeListData.push(placeCard);
      });
      dispatch(setPlaceListWithSurvey(placeListData));

      console.log(res);
    } catch (e) {
      errorControl(dispatch, "장소 조회 실패");
      console.log(e);
    }

    loadingControl(dispatch, false);
  };
};

export const getSearchPlaceList = (placeSearchInfo: PlaceSearchInfo) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    console.log("PlaceSearchInfo", placeSearchInfo);

    try {
      const res = await customAxios({
        method: "get",
        url: `/place/search`,
        params: placeSearchInfo,
      });
      const placeListData: PlaceCard[] = [];
      console.log("검색된 장소", res);

      if (placeSearchInfo.page + 1 >= res.data.totalPages) {
        dispatch(setFinished(true));
        console.log("조회끝");
      }

      res.data.content.map((place: PlaceInfoData, idx: number) => {
        const placeCard: PlaceCard =
          {
            id: `place-${idx}-${new Date()}`,
            content: {
              placeId: place.placeId,
              lat: place.lat,
              lng: place.lon,
              name: place.name,
              thumbnail: place.thumbnail,
              address: place.address,
              averageScore: place.averageScore,
              scoreCount: place.scoreCount,
              category: place.category,
              keywords: place.keywords,
            },
          } || [];
        placeListData.push(placeCard);
      });
      dispatch(setSearchPlaceList(placeListData));
    } catch (e) {
      errorControl(dispatch, "장소 검색 실패");
      console.log(e);
    }

    loadingControl(dispatch, false);
  };
};

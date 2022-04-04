// import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import {
  GET_PLACE_LIST,
  GET_PLACE_LIST_WITH_DISTANCE,
  PLACE_LIST_REQUEST,
  PLACE_LIST_SUCCESS,
  PLACE_LIST_FAILURE,
  PlaceListInfoForGet,
  PlaceCardList,
  PlaceInfo,
  PlaceCard,
  SET_PLACE_LIST,
  SET_PLACE_LIST_WITH_DISTANCE,
  SET_SEARCH_PLACE_LIST,
  PlaceSearchInfo,
} from "./types";
import { loadingControl, errorControl } from "../baseInfo/actions";

const placeListRequest = () => {
  return {
    type: PLACE_LIST_REQUEST,
  };
};

const placeListSuccess = (placeList: PlaceCardList) => {
  return {
    type: PLACE_LIST_SUCCESS,
    payload: placeList,
  };
};

const placeListFailure = () => {
  return {
    type: PLACE_LIST_FAILURE,
  };
};

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

// 장소 리스트 받아오기
// export const getPlaceList = (
//   fullCourseInfo: CreateFullCourseRequestData
// ) => {
//   return async (dispatch: Dispatch) => {
//     // 서버에 요청 => 로딩중 표시
//     dispatch(placeListRequest());

//     console.log("fullCourseInfo", fullCourseInfo);

//     try {
//       const res = await customAxios({
//         method: "POST",
//         url: `/fullCourse`,
//         data: fullCourseInfo,
//       });

//       const fullCourseId = res.data.fullCourseId;
//       dispatch(loadingControl(dispatch, fullCourseId));
//       console.log(res);
//     } catch (e) {
//       dispatch(createFullCourseFailure("풀코스 생성실패.."));
//       console.log(e);
//     }
//   };
// };

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

      const placeListData: PlaceCard[] = [];

      res.data.placeList.map((place: PlaceInfo, idx: number) => {
        const placeCard: PlaceCard =
          {
            id: `place-${idx}-${new Date()}`,
            content: place,
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

      const placeListData = res.data;
      dispatch(setSearchPlaceList(placeListData));

      console.log(res);
    } catch (e) {
      errorControl(dispatch, "장소 검색 실패");
      console.log(e);
    }

    loadingControl(dispatch, false);
  };
};

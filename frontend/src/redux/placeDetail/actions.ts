// import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../lib/customAxios";
import { SET_PLACE_DETAIL, SET_SELECTED_PLACE_ID } from "./types";
import { loadingControl, errorControl } from "../baseInfo/actions";
import { PlaceDetailState } from "./placeDetailReducer";

export const setSelectedPlaceId = (placeId: number) => {
  return {
    type: SET_SELECTED_PLACE_ID,
    payload: placeId,
  };
};

export const setPlaceDetail = (placeDetailData: PlaceDetailState) => {
  return {
    type: SET_PLACE_DETAIL,
    payload: placeDetailData,
  };
};

// 거리기반 장소 리스트 받아오기
export const getPlaceDetail = (placeId: number) => {
  return async (dispatch: Dispatch) => {
    // 서버에 요청 => 로딩중 표시
    loadingControl(dispatch, true);

    try {
      const res = await customAxios({
        method: "get",
        url: `/place/${placeId}`,
      });

      const placeDetail: PlaceDetailState = {
        placeId: res.data.placeId,
        name: res.data.name,
        info: res.data.info,
        openTime: res.data.openTime,
        lat: res.data.lat,
        lng: res.data.lon,
        address: res.data.address,
        category: res.data.category,
        phone: res.data.phone,
        label: res.data.label,
        station: res.data.station,
        averageScore: res.data.averageScore,
        thumbnail: res.data.thumbnail,
        menus: res.data.menus,
        scoreCount: res.data.scoreCount,
      };
      dispatch(setPlaceDetail(placeDetail));

    } catch (e) {
      errorControl(dispatch, "장소 상세 조회 실패");
    }

    loadingControl(dispatch, false);
  };
};

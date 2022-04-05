import { AnyAction } from "redux";
import { placeCardList } from "../../assets/dummyData/dummyData";
import {
  PlaceCardList,
  RESET_PLACE_LIST_WITH_DISTANCE,
  SET_PLACE_LIST,
  SET_PLACE_LIST_WITH_DISTANCE,
  SET_SEARCH_PLACE_LIST,
} from "./types";

export interface PlaceListState {
  placeList: PlaceCardList;
  placeListWithDistance: PlaceCardList;
  searchPlaceList: PlaceCardList;
}

const initialState: PlaceListState = {
  placeList: [...placeCardList],
  placeListWithDistance: [],
  searchPlaceList: [],
};

const placeListReducer = (
  state: PlaceListState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_PLACE_LIST:
      return {
        ...state,
        placeList: [...action.payload],
      };

    case SET_PLACE_LIST_WITH_DISTANCE:
      return {
        ...state,
        placeListWithDistance: [
          ...state.placeListWithDistance,
          ...action.payload,
        ],
      };

    case RESET_PLACE_LIST_WITH_DISTANCE:
      return {
        ...state,
        placeListWithDistance: [],
      };

    case SET_SEARCH_PLACE_LIST:
      return {
        ...state,
        searchPlaceList: [...action.payload],
      };

    default:
      return state;
  }
};

export default placeListReducer;

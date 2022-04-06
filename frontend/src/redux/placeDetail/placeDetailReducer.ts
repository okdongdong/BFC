import { AnyAction } from "redux";
import { SET_PLACE_DETAIL, SET_SELECTED_PLACE_ID } from "./types";

export interface PlaceDetailState {
  selectedPlaceId?: number;
  placeId: number;
  name: string;
  info: string;
  openTime: string[];
  lat: number;
  lng: number;
  address: string;
  category: number;
  phone: string;
  label: string;
  station: string;
  averageScore: number;
  thumbnail: string;
  menus: string[];
}

const initialState: PlaceDetailState = {
  selectedPlaceId: 0,
  placeId: 0,
  name: "",
  info: "",
  openTime: [],
  lat: 0,
  lng: 0,
  address: "",
  category: 0,
  phone: "",
  label: "",
  station: "",
  averageScore: 0,
  thumbnail: "",
  menus: [],
};

const placeDetailReducer = (
  state: PlaceDetailState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_SELECTED_PLACE_ID:
      return {
        ...state,
        selectedPlaceId: action.payload,
      };

    case SET_PLACE_DETAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default placeDetailReducer;

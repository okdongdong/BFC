import { AnyAction } from "redux";
import { placeList as dummyPlaceList } from "../../assets/dummyData/dummyData";
import { PlaceCardProps } from "../../types/main";
import { MOVE_CARD } from "./types";

export interface PlaceListDnd {
  placeList: Array<{ id: string; content: PlaceCardProps }> | Array<null>;
}

const plt: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];
const plt2: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];

dummyPlaceList.map((place: PlaceCardProps) =>
  plt.push({ id: `place-${place.placeId}`, content: place })
);
dummyPlaceList.map((place: PlaceCardProps) =>
  plt2.push({ id: `place2-${place.placeId}`, content: place })
);

const initialState: PlaceListDnd = { placeList: [...plt] };

const placeListReducer = (
  state: PlaceListDnd = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    // case MOVE_CARD:
    // return {
    // fullCourseList: [...action.payload.fullCourseList],
    // placeList: [...state.placeList],
    // };

    // case CREATE_FULL_COURSE:
    //   return {
    //     ...action.payload,
    //   };

    default:
      return state;
  }
};

export default placeListReducer;

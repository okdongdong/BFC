import { AnyAction } from "redux";
import { placeList } from "../../assets/dummyData/dummyData";
import { PlaceCardProps } from "../../types/main";
import { MOVE_CARD, CREATE_FULL_COURSE } from "./types";

export interface CreateFullCourseDnd {
  fullCourseList: Array<{ id: string; content: PlaceCardProps }> | Array<null>;
  placeList: Array<{ id: string; content: PlaceCardProps }> | Array<null>;
}

const plt: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];
const plt2: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];

placeList.map((place: PlaceCardProps) =>
  plt.push({ id: `place-${place.placeId}`, content: place })
);
placeList.map((place: PlaceCardProps) =>
  plt2.push({ id: `place2-${place.placeId}`, content: place })
);

const initialState: CreateFullCourseDnd = {
  fullCourseList: [...plt2],
  placeList: [...plt],
};

const createFullCourseReducer = (
  state: CreateFullCourseDnd = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case MOVE_CARD:
      return {
        fullCourseList: [...action.payload.fullCourseList],
        placeList: [...action.payload.placeList],
      };

    // case CREATE_FULL_COURSE:
    //   return {
    //     ...action.payload,
    //   };

    default:
      return state;
  }
};

export default createFullCourseReducer;

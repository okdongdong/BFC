import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { AnyAction } from "redux";
import { placeList } from "../../assets/dummyData/dummyData";
import { PlaceCardProps } from "../../types/main";
import {
  MOVE_CARD,
  CREATE_FULL_COURSE,
  SET_FULL_COURSE_DATE,
  FullCourseListProps,
} from "./types";

export interface CreateFullCourseDnd {
  fullCourseList: FullCourseListProps;
  fullCourseDate: DateRange<Date>;
}

const plt: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];
const plt2: Array<{ id: string; content: PlaceCardProps }> | Array<any> = [];

placeList.map((place: PlaceCardProps) =>
  plt.push({ id: `place-${place.placeId}`, content: place })
);
placeList.map((place: PlaceCardProps) =>
  plt2.push({
    id: `place2-${place.placeId}+${new Date().getTime()}`,
    content: place,
  })
);

const initialState: CreateFullCourseDnd = {
  fullCourseList: [[...plt2]],
  fullCourseDate: [null, null],
};

const createFullCourseReducer = (
  state: CreateFullCourseDnd = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case MOVE_CARD:
      return {
        ...state,
        fullCourseList: [...action.payload],
        // placeList: [...state.placeList],
      };

    case SET_FULL_COURSE_DATE:
      const [startDate, endDate] = action.payload;

      if (startDate !== null && endDate !== null) {
        const diffDate = startDate.getTime() - endDate.getTime();
        const dayLength = Math.abs(diffDate / (1000 * 3600 * 24)) + 1;
        const newFullCourseList: any = [];
        for (
          let i = 0;
          i < Math.min(state.fullCourseList.length, dayLength);
          i++
        ) {
          newFullCourseList.push([...state.fullCourseList[i]]);
        }
        if (state.fullCourseList.length < dayLength) {
          for (let i = state.fullCourseList.length; i < dayLength; i++) {
            newFullCourseList.push([]);
          }
        } else {
          for (let i = dayLength; i < state.fullCourseList.length; i++) {
            newFullCourseList[dayLength - 1] = [
              ...newFullCourseList[dayLength - 1],
              ...state.fullCourseList[i],
            ];
          }
        }
        return {
          fullCourseList: newFullCourseList,
          fullCourseDate: [...action.payload],
        };
      }
      return {
        ...state,
        fullCourseDate: [...action.payload],
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

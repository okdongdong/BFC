import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./account/reducer";
import baseInfoReducer from "./baseInfo/baseInfoReducer";
import createFullCourseReducer from "./createFullCourse/createFullCourseReducer";
import { placeReducer, reviewListReducer } from "./detail/reducer";

import placeListReducer from "./placeList/placeListReducer";
import profileReducer from "./profile/reducer";
import scheduleReducer from "./schedule/scheduleReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account", "createFullCourse"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  baseInfo: baseInfoReducer,
  createFullCourse: createFullCourseReducer,
  placeListReducer: placeListReducer,
  // createPlaceList: placeListReducer,
  profile: profileReducer,
  schedule: scheduleReducer,
  place: placeReducer,
  reviewList: reviewListReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export type AccountReducer = ReturnType<typeof accountReducer>;
export type BaseInfoReducer = ReturnType<typeof baseInfoReducer>;
export type CreateFullCourseReducer = ReturnType<
  typeof createFullCourseReducer
>;
export type PlaceListReducer = ReturnType<typeof placeListReducer>;
export type ProfileReducer = ReturnType<typeof profileReducer>;
export type ScheduleReducer = ReturnType<typeof scheduleReducer>;
export type PlaceReducer = ReturnType<typeof placeReducer>;
export type ReviewListReducer = ReturnType<typeof reviewListReducer>;

export default persistReducer(persistConfig, rootReducer);

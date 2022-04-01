import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./account/reducer";
import baseInfoReducer from "./baseInfo/baseInfoReducer";
import createFullCourseReducer from "./createFullCourse/createFullCourseReducer";
import placeListReducer from "./placeList/placeListReducer";

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
});

export type RootReducer = ReturnType<typeof rootReducer>;
export type AccountReducer = ReturnType<typeof accountReducer>;
export type BaseInfoReducer = ReturnType<typeof baseInfoReducer>;
export type CreateFullCourseReducer = ReturnType<
  typeof createFullCourseReducer
>;
export type PlaceListReducer = ReturnType<typeof placeListReducer>;

export default persistReducer(persistConfig, rootReducer);

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./account/reducer";
import createFullCourseReducer from "./createFullCourse/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  createFullCourse: createFullCourseReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export type AccountReducer = ReturnType<typeof accountReducer>;
export type CreateFullCourseReducer = ReturnType<
  typeof createFullCourseReducer
>;

export default persistReducer(persistConfig, rootReducer);

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./account/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accountReducer"],
};

const rootReducer = combineReducers({
  account: accountReducer,
});

export default persistReducer(persistConfig, rootReducer);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fontSliceReducer from "./fontSlice";
import { FontSliceProps, TesterDescription } from "@/models/common";
import fontMetaSlice from "./fontMetaSlice";
import testerFontSlice from "./testerFontSlice";

interface StoreState {
  fontSlice: FontSliceProps;
  fontsMeta: FontSliceProps;
  testerDesc: TesterDescription;
}

const rootReducer = combineReducers<StoreState>({
  fontSlice: fontSliceReducer,
  fontsMeta: fontMetaSlice,
  testerDesc: testerFontSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fontSliceReducer from "./fontSlice";
import { FontSliceProps, TesterDescription } from "@/models/common";
import fontMetaSlice from "./fontMetaSlice";
import testerFontSlice from "./testerFontSlice";
import cartSlice from "./cartSlice";

interface StoreState {
  fontSlice: FontSliceProps;
  fontsMeta: FontSliceProps;
  testerDesc: TesterDescription;
  cart: { titles: string[]; popup: boolean };
}

const rootReducer = combineReducers<StoreState>({
  fontSlice: fontSliceReducer,
  fontsMeta: fontMetaSlice,
  testerDesc: testerFontSlice,
  cart: cartSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

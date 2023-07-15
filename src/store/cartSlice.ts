import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FontCartState {
  titles: string[];
  popup: boolean;
}

const initialState: FontCartState = {
  titles: JSON.parse(localStorage.getItem("carts") || "[]"),
  popup: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addFontTitle: (state, action: PayloadAction<string>) => {
      state.titles.push(action.payload);
      localStorage.setItem("carts", JSON.stringify(state.titles));
    },
    removeFontTitle: (state, action: PayloadAction<string>) => {
      state.titles = state.titles.filter((item) => item !== action.payload);
      localStorage.setItem("carts", JSON.stringify(state.titles));
    },
    clearFontCart: (state) => {
      state.titles = [];
      localStorage.removeItem("carts");
    },
    togglePopup(state) {
      state.popup = !state.popup;
    },
  },
});

export const { addFontTitle, removeFontTitle, clearFontCart, togglePopup } =
  cartSlice.actions;

export default cartSlice.reducer;

import useGetFonts from "@/hooks/useGetFonts";
import { FontSliceProps } from "@/models/common";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFonts = createAsyncThunk("GET_FONT_LIST", async () => {
  const response = await useGetFonts();
  return response?.items;
});

const initialState: FontSliceProps = {
  data: [],
  loading: false,
  error: null,
};

const fontSlice = createSlice({
  name: "fontSlice",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: any) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFonts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFonts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFonts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  fontSlice.actions;
export default fontSlice.reducer;

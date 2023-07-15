import useGetFontMeta from "@/hooks/useGetFontMeta";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FontSliceProps } from "@/models/common";

export const getMetaFonts = createAsyncThunk(
  "fontMetaSlice/GET_META_FONT_LIST",
  async () => {
    const response = await useGetFontMeta();
    return response?.familyMetadataList ?? [];
  }
);

const initialState: FontSliceProps = {
  data: [],
  loading: false,
  error: null,
};

const fontMetaSlice = createSlice({
  name: "fontMetaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMetaFonts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMetaFonts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMetaFonts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error occurred";
      });
  },
});

export default fontMetaSlice.reducer;

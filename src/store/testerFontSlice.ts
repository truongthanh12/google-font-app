import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TesterDescription } from "@/models/common";
import useGetTesterFont from "@/hooks/useGetTesterFont";
import useGetTesterFontParagraph from "@/hooks/useGetTesterFontParagraph";

export const getTesterDesc = createAsyncThunk(
  "testerFonts/GET_TESTER_DESCRIPTION",
  async ({ family }: any) => {
    const response = await useGetTesterFont({ family });
    return response;
  }
);

export const getTesterDescParagraph = createAsyncThunk(
  "testerFonts/GET_TESTER_DESCRIPTION_PARAGRAPH",
  async ({ family }: any) => {
    const response = await useGetTesterFontParagraph({ family });
    return response;
  }
);

const initialState: TesterDescription = {
  data: "",
};

const testerFonts = createSlice({
  name: "testerFonts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTesterDesc.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getTesterDescParagraph.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default testerFonts.reducer;

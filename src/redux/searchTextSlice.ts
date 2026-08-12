import { createSlice } from "@reduxjs/toolkit";
import { SearchSliceState } from "../types/slicesState";

const searchTextSlice = createSlice({
  name: "text",
  initialState: {
    searchTextShown: "",
    searchTextStored: "",
    searchTag: "",
    videoTitle: "",
  },
  reducers: {
    addSearchTextShown: (state: SearchSliceState, action) => {
      state.searchTextShown = action.payload;
    },
    // addSearchTextStored: (state: SearchSliceState, action) => {
    //   state.searchTextStored = action.payload;
    // },
    addSearchTag: (state: SearchSliceState, action) => {
      state.searchTag = action.payload;
    },
    addVideoTitle: (state: SearchSliceState, action) => {
      state.videoTitle = action.payload;
    },
    // addSuggestedCategory: (state: SearchSliceState, action) => {
    //   state.suggestionCategory = action.payload;
    // },
  },
});
export const { addSearchTextShown, addSearchTag, addVideoTitle } =
  searchTextSlice.actions;
export default searchTextSlice.reducer;

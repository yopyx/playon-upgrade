import { createSlice } from "@reduxjs/toolkit";
import { SearchSliceState } from "../types/slicesState";

const searchTextSlice = createSlice({
  name: "text",
  initialState: {
    searchTextStored: "",
    searchTag: "",
    suggestionCategory: "All",
  },
  reducers: {
    addSearchText: (state: SearchSliceState, action) => {
      state.searchTextStored = action.payload;
    },
    addSearchTag: (state: SearchSliceState, action) => {
      state.searchTag = action.payload;
    },
    addSuggestedCategory: (state: SearchSliceState, action) => {
      state.suggestionCategory = action.payload;
    },
  },
});
export const { addSearchText, addSearchTag, addSuggestedCategory } =
  searchTextSlice.actions;
export default searchTextSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SearchSliceState } from "../types/slicesState";

const searchTextSlice = createSlice({
  name: "text",
  initialState: {
    searchTextStored: "",
    suggestionCategory: "All",
  } as SearchSliceState,
  reducers: {
    addSearchText: (state, action) => {
      state.searchTextStored = action.payload as string;
    },
    addSuggestedCategory: (state, action) => {
      state.suggestionCategory = action.payload as string;
    },
  },
});
export const { addSearchText, addSuggestedCategory } = searchTextSlice.actions;
export default searchTextSlice.reducer;

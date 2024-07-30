import { createSlice } from "@reduxjs/toolkit";

const searchTextSlice = createSlice({
  name: "text",
  initialState: {
    search: "",
    suggestion: "All",
  },
  reducers: {
    addSearchText: (state, action) => {
      state.search = action.payload;
    },
    addSuggestedCategory: (state, action) => {
      state.suggestion = action.payload;
    },
  },
});
export const { addSearchText, addSuggestedCategory } = searchTextSlice.actions;
export default searchTextSlice.reducer;

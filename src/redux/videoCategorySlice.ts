import { createSlice } from "@reduxjs/toolkit";

const videoCategory = createSlice({
  name: "category",
  initialState: {
    category: "All",
  },
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { addCategory } = videoCategory.actions;
export default videoCategory.reducer;

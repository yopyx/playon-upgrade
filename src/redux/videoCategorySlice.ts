import { createSlice } from "@reduxjs/toolkit";

const videoCategory = createSlice({
  name: "category",
  initialState: {
    categoryDetails: { id: "0" },
  },
  reducers: {
    addCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
  },
});
export const { addCategoryDetails } = videoCategory.actions;
export default videoCategory.reducer;

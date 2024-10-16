import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types/fetchedData";

const videoCategory = createSlice({
  name: "category",
  initialState: {
    categoryDetails: {} as Category,
  },
  reducers: {
    addCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
  },
});
export const { addCategoryDetails } = videoCategory.actions;
export default videoCategory.reducer;

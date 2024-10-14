import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types/fetchedData";

const videoCategory = createSlice({
  name: "category",
  initialState: {
    categoryDetails: { id: "0" },
  },
  reducers: {
    addCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload as Category;
    },
  },
});
export const { addCategoryDetails } = videoCategory.actions;
export default videoCategory.reducer;

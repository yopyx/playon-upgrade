import { createSlice } from "@reduxjs/toolkit";
import { Category, ObjectStr2 } from "../types/fetchedData";

const videoCategory = createSlice({
  name: "category",
  initialState: {
    categoryDetails: { id: "0", title: "All" } as Category,
    videoTags: { resultsPage: {}, watchPage: {} } as {
      resultsPage: ObjectStr2;
      watchPage: ObjectStr2;
    },
    selectedCategory: "All",
  },
  reducers: {
    addCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
    addVideoTags: (state, action) => {
      const key =
        action.payload[0] === "/results" ? "resultsPage" : "watchPage";
      state.videoTags[key][action.payload[1]] = action.payload[2];
    },
    addSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { addCategoryDetails, addVideoTags, addSelectedCategory } =
  videoCategory.actions;
export default videoCategory.reducer;

import { createSlice } from "@reduxjs/toolkit";

const tagsUiSlice = createSlice({
  name: "tagsUi",
  initialState: {
    mainPage: { translatedByValue: 0 },
    resultsPage: { translatedByValue: 0 },
    watchPage: { translatedByValue: 0 },
  } as {
    mainPage: { translatedByValue: number };
    resultsPage: { translatedByValue: number };
    watchPage: { translatedByValue: number };
  },
  reducers: {
    setTranslatingValue: (state, action) => {
      const [path, value] = action.payload;
      const page =
        path == "/"
          ? "mainPage"
          : path == "/watch"
            ? "watchPage"
            : "resultsPage";
      state[page].translatedByValue = value;
    },
  },
});
export const { setTranslatingValue } = tagsUiSlice.actions;
export default tagsUiSlice.reducer;

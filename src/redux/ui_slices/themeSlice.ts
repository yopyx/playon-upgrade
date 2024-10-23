import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    light: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.light = !state.light;
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

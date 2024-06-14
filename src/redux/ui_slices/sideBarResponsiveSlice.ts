import { createSlice } from "@reduxjs/toolkit";

const sideBarResponsiveSlice = createSlice({
  name: "responsive slice",
  initialState: {
    collapseSidebar: false,
    translateValue: 0,
  },
  reducers: {
    toggleSidebarView: (state) => {
      state.collapseSidebar = !state.collapseSidebar;
    },
    closeSidebarMenu: (state) => {
      state.collapseSidebar = true;
    },
    changeTranslateValue: (state, action) => {
      state.translateValue = action.payload;
    },
  },
});
export const { toggleSidebarView, changeTranslateValue, closeSidebarMenu } =
  sideBarResponsiveSlice.actions;
export default sideBarResponsiveSlice.reducer;

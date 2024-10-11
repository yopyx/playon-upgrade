import { createSlice } from "@reduxjs/toolkit";
import { sideBarSliceState } from "../../types/slicesState";

const sideBarResponsiveSlice = createSlice({
  name: "responsive slice",
  initialState: {
    collapseSidebar: false,
  } as sideBarSliceState,
  reducers: {
    toggleSidebarView: (state: sideBarSliceState) => {
      state.collapseSidebar = !state.collapseSidebar;
    },
    openCloseSidebar: (state: sideBarSliceState, action) => {
      state.collapseSidebar = action.payload;
    },
  },
});
export const { toggleSidebarView, openCloseSidebar } =
  sideBarResponsiveSlice.actions;
export default sideBarResponsiveSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SideBarSliceState } from "../../types/slicesState";

const sideBarResponsiveSlice = createSlice({
  name: "responsive slice",
  initialState: {
    collapseSidebar: false,
  } as SideBarSliceState,
  reducers: {
    toggleSidebarView: (state: SideBarSliceState) => {
      state.collapseSidebar = !state.collapseSidebar;
    },
    openCloseSidebar: (state: SideBarSliceState, action) => {
      state.collapseSidebar = action.payload;
    },
  },
});
export const { toggleSidebarView, openCloseSidebar } =
  sideBarResponsiveSlice.actions;
export default sideBarResponsiveSlice.reducer;

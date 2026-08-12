import { createSlice } from "@reduxjs/toolkit";
import { SideBarSliceState } from "../../types/slicesState";

const sideBarResponsiveSlice = createSlice({
  name: "responsive slice",
  initialState: {
    mainContainerPage: { collapseSidebar: false },
    resultsPage: { collapseSidebar: false },
    watchPage: { collapseSidebar: true },
    historyPage: { collapseSidebar: false },
  } as SideBarSliceState,
  reducers: {
    toggleSidebarView: (state: SideBarSliceState, action) => {
      state[action.payload].collapseSidebar =
        !state[action.payload].collapseSidebar;
    },
    openCloseSidebar: (state: SideBarSliceState, action) => {
      state[action.payload[0]].collapseSidebar = action.payload[1];
    },
  },
});
export const { toggleSidebarView, openCloseSidebar } =
  sideBarResponsiveSlice.actions;
export default sideBarResponsiveSlice.reducer;

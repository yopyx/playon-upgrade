import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./ui_slices/sideBarResponsiveSlice";
const appStore = configureStore({
  reducer: { responsiveSideBar: sideBarReducer },
});

export default appStore;

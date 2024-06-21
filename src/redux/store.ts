import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./ui_slices/sideBarResponsiveSlice";
import categoryReducer from "./videoCategorySlice";
const appStore = configureStore({
  reducer: {
    responsiveSideBar: sideBarReducer,
    videoCategory: categoryReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;

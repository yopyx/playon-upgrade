import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./ui_slices/sideBarResponsiveSlice";
import categoryReducer from "./videoCategorySlice";
import videosDataReducer from "./videosDataSlice";
import channelsDataReducer from "./channelsDataSlice";
import searchSuggestionsReducer from "./autoCompleteSearchSuggestionsSlice";
import searchTextReducer from "./searchTextSlice";
const appStore = configureStore({
  reducer: {
    responsiveSideBar: sideBarReducer,
    videoCategory: categoryReducer,
    videosData: videosDataReducer,
    channelsData: channelsDataReducer,
    searchSuggestions: searchSuggestionsReducer,
    searchText: searchTextReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;

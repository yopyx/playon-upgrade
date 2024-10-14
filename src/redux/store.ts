import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./ui_slices/sideBarResponsiveSlice";
import categoryReducer from "./videoCategorySlice";
import videosDataReducer from "./videosDataSlice";
import channelsDataReducer from "./channelsDataSlice";
import searchSuggestionsReducer from "./autoCompleteSearchSuggestionsSlice";
import searchTextReducer from "./searchTextSlice";
import commentsReducer from "./commentsSlice";
import liveChatReducer from "./liveChatSlice";
import quotaReducer from "./ui_slices/quotaSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  responsiveSideBar: sideBarReducer,
  videoCategory: categoryReducer,
  videosData: videosDataReducer,
  channelsData: channelsDataReducer,
  searchSuggestions: searchSuggestionsReducer,
  searchText: searchTextReducer,
  comments: commentsReducer,
  liveChat: liveChatReducer,
  quota: quotaReducer,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore, persistor };

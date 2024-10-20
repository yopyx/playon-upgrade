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
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

const sessionPersistConfig = {
  key: "session-root",
  storage: storageSession,
  whitelist: [
    "responsiveSideBar",
    "videoCategory",
    "videosData",
    "channelsData",
    "searchSuggestions",
    "searchText",
    "comments",
    "liveChat",
  ],
};
const localPersistConfig = {
  key: "local-root",
  storage,
};
const rootReducer = combineReducers({
  responsiveSideBar: sideBarReducer,
  videoCategory: categoryReducer,
  videosData: videosDataReducer,
  channelsData: channelsDataReducer,
  searchSuggestions: searchSuggestionsReducer,
  searchText: searchTextReducer,
  comments: commentsReducer,
  liveChat: liveChatReducer,
  quota: persistReducer(localPersistConfig, quotaReducer),
});
const persistedReducer = persistReducer(sessionPersistConfig, rootReducer);
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: !import.meta.env.PROD, // DevTools enabled only in development
});

const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore, persistor };

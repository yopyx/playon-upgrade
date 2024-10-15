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
import storage from "redux-persist/lib/storage";

const sessionPersistConfig = {
  key: "session-root",
  storage: storageSession,
};
const localPersistConfig = {
  key: "local-root",
  storage: storage,
};
const rootReducer = combineReducers({
  responsiveSideBar: persistReducer(sessionPersistConfig, sideBarReducer),
  videoCategory: persistReducer(sessionPersistConfig, categoryReducer),
  videosData: persistReducer(sessionPersistConfig, videosDataReducer),
  channelsData: persistReducer(sessionPersistConfig, channelsDataReducer),
  searchSuggestions: persistReducer(
    sessionPersistConfig,
    searchSuggestionsReducer
  ),
  searchText: persistReducer(sessionPersistConfig, searchTextReducer),
  comments: persistReducer(sessionPersistConfig, commentsReducer),
  liveChat: persistReducer(sessionPersistConfig, liveChatReducer),
  quota: persistReducer(localPersistConfig, quotaReducer),
});
const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore, persistor };

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./ui_slices/sideBarResponsiveSlice";
import categoryReducer from "./videoCategorySlice";
import searchTextReducer from "./searchTextSlice";
import commentsReducer from "./commentsSlice";
import liveChatReducer from "./liveChatSlice";
import themeReducer from "./ui_slices/themeSlice";
import quotaReducer from "./ui_slices/quotaSlice";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const sessionPersistConfig = {
  key: "session-root",
  storage: storageSession,
};
const rootReducer = combineReducers({
  responsiveSideBar: sideBarReducer,
  videoCategory: categoryReducer,
  searchText: searchTextReducer,
  comments: commentsReducer,
  liveChat: liveChatReducer,
  theme: themeReducer,
  quota: quotaReducer,
    user: userReducer,
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

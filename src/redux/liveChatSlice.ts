import { createSlice } from "@reduxjs/toolkit";
import { LiveChatState } from "../types/slicesState";
const liveChatSlice = createSlice({
  name: "live chat",
  initialState: { chat: [], token: {}, messages: {} } as LiveChatState,
  reducers: {
    addLiveChat: (state: LiveChatState, action) => {
      state.chat = action.payload;
    },
    addLiveChatToken: (state: LiveChatState, action) => {
      const [chatId, token] = action.payload;
      state.token[chatId] = token;
    },
    addNewMessage: (state: LiveChatState, action) => {
      const [chatId, etag, msg] = action.payload;
      state.messages[chatId] = { [etag]: msg };
    },
  },
});

export const { addLiveChat, addLiveChatToken, addNewMessage } =
  liveChatSlice.actions;
export default liveChatSlice.reducer;

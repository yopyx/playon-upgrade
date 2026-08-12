import { createSlice } from "@reduxjs/toolkit";
import { LiveChatState } from "../types/slicesState";
const liveChatSlice = createSlice({
  name: "live chat",
  initialState: { messages: {} } as LiveChatState,
  reducers: {
    addNewMessage: (state: LiveChatState, action) => {
      const [chatId, etag, msg] = action.payload;
      state.messages[chatId] = { ...state.messages[chatId], [etag]: msg };
    },
  },
});

export const { addNewMessage } = liveChatSlice.actions;
export default liveChatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { LiveChatComment } from "../types/fetchedData";
const liveChatSlice = createSlice({
  name: "live chat",
  initialState: { chat: [], currentIndex: 0 } as {
    chat: LiveChatComment[];
    currentIndex: number;
  },
  reducers: {
    addLiveChat: (state, action) => {
      state.currentIndex = action.payload.length;
      state.chat = action.payload;
    },
    addNewMessage: (state, action) => {
      state.currentIndex++;
      state.chat.push(action.payload as LiveChatComment);
      if (state.currentIndex > 201) state.chat.shift();
    },
  },
});

export const { addLiveChat, addNewMessage } = liveChatSlice.actions;
export default liveChatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { CommentPostState } from "../types/slicesState";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    addComment: (state: CommentPostState, action) => {
      const { id, comment } = action.payload;
      state[id] ? state[id].push(comment) : (state[id] = [comment]);
    },
  },
});
export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;

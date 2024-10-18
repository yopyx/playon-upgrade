import { createSlice } from "@reduxjs/toolkit";
import { CommentPostState } from "../types/slicesState";

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: {}, newComments: [] },
  reducers: {
    addComment: (state: CommentPostState, action) => {
      const { id, comment } = action.payload;
      state.comments[id]
        ? state.comments[id].push(comment)
        : (state.comments[id] = [comment]);
    },
    addNewComment: (state: CommentPostState, action) => {
      state.newComments.push(action.payload);
    },
  },
});
export const { addComment, addNewComment } = commentsSlice.actions;
export default commentsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { CommentPostState } from "../types/slicesState";
import { CommentPostVersion } from "../types/fetchedData";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {} as CommentPostState,
  reducers: {
    addComment: (state, action) => {
      const { id, comment } = action.payload as {
        id: string;
        comment: CommentPostVersion;
      };
      state[id] ? state[id].push(comment) : (state[id] = [comment]);
    },
  },
});
export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;

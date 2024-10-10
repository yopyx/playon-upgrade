import { createSlice } from "@reduxjs/toolkit";
import { VideoState } from "../types/slicesState";

const videosDataSlice = createSlice({
  name: "Videos data",
  initialState: {} as VideoState,
  reducers: {
    addVideo: (state: VideoState, action) => {
      state[action.payload.id] = action.payload;
    },
  },
});
export const { addVideo } = videosDataSlice.actions;
export default videosDataSlice.reducer;

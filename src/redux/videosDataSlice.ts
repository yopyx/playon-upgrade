import { createSlice } from "@reduxjs/toolkit";
import { VideoDetails } from "../types/fetchedData";
type VideoState = {
  videos: { [id: string]: VideoDetails };
};
const initialState: VideoState = {
  videos: {},
};
const videosDataSlice = createSlice({
  name: "Videos data",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videos[action.payload.id] = action.payload;
    },
  },
});
export const { addVideo } = videosDataSlice.actions;
export default videosDataSlice.reducer;

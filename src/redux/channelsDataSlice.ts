import { createSlice } from "@reduxjs/toolkit";
import { ChannelState } from "../types/slicesState";

const initialState: ChannelState = {
  channels: {},
};
const channelsDataSlice = createSlice({
  name: "Videos data",
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels[action.payload.id] = action.payload;
    },
  },
});
export const { addChannel } = channelsDataSlice.actions;
export default channelsDataSlice.reducer;

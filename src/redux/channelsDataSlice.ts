import { createSlice } from "@reduxjs/toolkit";
import { ChannelState } from "../types/slicesState";

const channelsDataSlice = createSlice({
  name: "Videos data",
  initialState: {
    channels: {},
  } as ChannelState,
  reducers: {
    addChannel: (state: ChannelState, action) => {
      state.channels = {
        ...state.channels,
        ...{ [action.payload.id]: action.payload },
      };
    },
  },
});
export const { addChannel } = channelsDataSlice.actions;
export default channelsDataSlice.reducer;

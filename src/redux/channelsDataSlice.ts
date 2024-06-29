import { createSlice } from "@reduxjs/toolkit";
import { ChannelDetails } from "../types/fetchedData";
type ChannelState = {
  channels: { [id: string]: ChannelDetails };
};
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

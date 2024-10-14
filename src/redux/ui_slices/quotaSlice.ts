import { createSlice } from "@reduxjs/toolkit";

const quotaSlice = createSlice({
  name: "quota",
  initialState: { quota: 10000, currentIndex: 0 },
  reducers: {
    updateQuota: (state, action) => {
      state.quota -= action.payload;
      if (state.quota < 200) {
        state.currentIndex += 1;
        state.quota = 10000;
      }
    },
  },
});
export const { updateQuota } = quotaSlice.actions;
export default quotaSlice.reducer;

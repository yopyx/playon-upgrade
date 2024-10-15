import { createSlice } from "@reduxjs/toolkit";

const quotaSlice = createSlice({
  name: "quota",
  initialState: {
    quota: 10000,
    keys: [
      import.meta.env.VITE_APP_YT_KEY,
      import.meta.env.VITE_APP_YT_KEY1,
      import.meta.env.VITE_APP_YT_KEY2,
      import.meta.env.VITE_APP_YT_KEY3,
      import.meta.env.VITE_APP_YT_KEY4,
      import.meta.env.VITE_APP_YT_KEY5,
      import.meta.env.VITE_APP_YT_KEY6,
    ],
  },
  reducers: {
    updateQuota: (state, action) => {
      state.quota -= action.payload;
      if (state.quota < 200) {
        const e = state.keys.shift();
        state.keys.push(e);
        state.quota = 10000;
      }
    },
  },
});
export const { updateQuota } = quotaSlice.actions;
export default quotaSlice.reducer;

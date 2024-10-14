import { createSlice } from "@reduxjs/toolkit";
import { SearchSuggestionsState } from "../types/slicesState";

const autoCompleteSearchSuggestionsSlice = createSlice({
  name: "search suggestions",
  initialState: {} as SearchSuggestionsState,
  reducers: {
    addSuggestions: (state: SearchSuggestionsState, action) => {
      const { text, suggestions } = action.payload;
      state[text] = suggestions;
    },
  },
});
export const { addSuggestions } = autoCompleteSearchSuggestionsSlice.actions;
export default autoCompleteSearchSuggestionsSlice.reducer;

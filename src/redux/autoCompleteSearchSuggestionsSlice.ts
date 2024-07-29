import { createSlice } from "@reduxjs/toolkit";

type SearchSuggestionsState = {
  [text: string]: string[];
};
const autoCompleteSearchSuggestionsSlice = createSlice({
  name: "search suggestions",
  initialState: {},
  reducers: {
    addSuggestions: (state: SearchSuggestionsState, action) => {
      const { text, suggestions } = action.payload;
      state[text] = suggestions;
    },
  },
});
export const { addSuggestions } = autoCompleteSearchSuggestionsSlice.actions;
export default autoCompleteSearchSuggestionsSlice.reducer;

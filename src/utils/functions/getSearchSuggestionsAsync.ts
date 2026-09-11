import { SearchSuggestionsWithStatus } from "../../types/fetchedData";

const getSearchSuggestionsAsync = async (searchText: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/api/search_suggestions?q=${searchText}`
      : `/api/search_suggestions?q=${searchText}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      searchSuggestions: { text: searchText, suggestions: [] },
      status: response.status,
    } as SearchSuggestionsWithStatus;
  }
  const data = await response.json();
  return {
    searchSuggestions: { text: searchText, suggestions: data },
    status: response.status,
  } as SearchSuggestionsWithStatus;
};
export default getSearchSuggestionsAsync;

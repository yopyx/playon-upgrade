import { CORS, YT_SEARCH_API } from "../constants";

const getSearchSuggestions = async (searchText: string) => {
  const url = CORS + encodeURIComponent(YT_SEARCH_API(searchText));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return { text: searchText, suggestions: data[1] } as {
    text: string;
    suggestions: string[];
  };
};
export default getSearchSuggestions;

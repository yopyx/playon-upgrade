const getSearchSuggestions = async (searchText: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/search-suggest?searchText=${searchText}`
      : `http://localhost:3000/search-suggest?searchText=${searchText}`;
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

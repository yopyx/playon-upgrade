import {
  VideoCardListData,
  VideoCardListWithStatus,
} from "../../types/fetchedData";
const getSearchResultedVideosAsync = async (
  searchText: string,
  pageNum: number = 1,
) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/resources_api/search_results?q=${searchText}&pageNum=${pageNum}`
      : `/resources_api/search_results?q=${searchText}&pageNum=${pageNum}`;
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.status !== 200) {
    return {
      videosData: { videoCardList: [], queryNextPage: false },
      status: response.status,
    } as VideoCardListWithStatus;
  }
  const videosData = (await response.json()) as VideoCardListData;
  return { videosData, status: response.status } as VideoCardListWithStatus;
};
export default getSearchResultedVideosAsync;

import {
  FetchedSearchResults,
  FetchedVideoCardData,
} from "../../types/fetchedData";
import { CORS, YT_SEARCH_RESULTS_API } from "../constants";
import getVideosListById from "./getVideosListById";

const getSearchResultedVideos = async (
  searchText: string,
  pageToken: string
) => {
  const url =
    CORS + encodeURIComponent(YT_SEARCH_RESULTS_API(searchText, pageToken));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = (await response.json()) as FetchedSearchResults;
  const videos_channels_data = await getVideosListById(
    data.items.map((v) => v.id.videoId)
  );
  return { nextToken: data.nextPageToken, data: videos_channels_data } as {
    nextToken: string;
    data: FetchedVideoCardData;
  };
};
export default getSearchResultedVideos;

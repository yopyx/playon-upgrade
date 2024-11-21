import {
  FetchedSearchResults,
  FetchedVideoCardData,
} from "../../types/fetchedData";
import getVideosListById from "./getVideosListById";
const getSearchResultedVideos = async (
  searchText: string,
  pageToken: string,
  apiKey: string
) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/search-results?searchText=${searchText}&nextToken=${pageToken}&apiKey=${apiKey}`
      : `http://localhost:3000/search-results?searchText=${searchText}&nextToken=${pageToken}&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = (await response.json()) as FetchedSearchResults;
  const videos_channels_data = await getVideosListById(
    data.items.map((v) => v.id.videoId),
    apiKey
  );
  return { nextToken: data.nextPageToken, data: videos_channels_data } as {
    nextToken: string;
    data: FetchedVideoCardData;
  };
};
export default getSearchResultedVideos;

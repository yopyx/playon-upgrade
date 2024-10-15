import { FetchedVideoCardData, VideosListData } from "../../types/fetchedData";
import { CORS, YT_API } from "../constants";
import getChannelData from "./getChannelData";

const getPopularVideos = async (
  categoryId: string,
  pageToken: string,
  apiKey: string
) => {
  const url = CORS + encodeURIComponent(YT_API(categoryId, pageToken, apiKey));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const videosData = (await response.json()) as VideosListData;
  const channelsData = await getChannelData(
    videosData.items.map((v) => v.snippet.channelId),
    apiKey
  );
  return { videosData, channelsData } as FetchedVideoCardData;
};

export default getPopularVideos;

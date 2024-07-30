import { FetchedVideoCardData, VideosListData } from "../../types/fetchedData";
import { CORS, YT_VIDEO_BY_ID_API } from "../constants";
import getChannelData from "./getChannelData";

const getVideosListById = async (ids: string[]) => {
  const url = CORS + encodeURIComponent(YT_VIDEO_BY_ID_API(ids));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const videosData = (await response.json()) as VideosListData;
  const channelsData = await getChannelData(
    videosData.items.map((v) => v.snippet.channelId)
  );
  return { videosData, channelsData } as FetchedVideoCardData;
};
export default getVideosListById;

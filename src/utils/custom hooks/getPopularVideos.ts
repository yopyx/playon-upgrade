import { VideosListData } from "../../types/fetchedData";
import { CORS, YT_API } from "../constants";

const getPopularVideos = async (categoryId: string, pageToken: string) => {
  const url = CORS + encodeURIComponent(YT_API(pageToken, categoryId));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = (await response.json()) as VideosListData;
  return data;
};

export default getPopularVideos;

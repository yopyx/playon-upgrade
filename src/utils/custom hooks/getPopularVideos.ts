import { VideosListData } from "../../types/fetchedData";
import { CORS, YT_API } from "../constants";

const getPopularVideos = async (categoryId: string, pageToken: string) => {
  const url = CORS + encodeURIComponent(YT_API(categoryId, pageToken));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data as VideosListData;
};

export default getPopularVideos;

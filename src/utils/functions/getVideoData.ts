import { VideoDetails } from "../../types/fetchedData";
import { CORS, YT_VIDEO_BY_ID_API } from "../constants";

const getVideoData = async (vidId: string) => {
  const url = CORS + encodeURIComponent(YT_VIDEO_BY_ID_API.join(vidId));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.items[0] as VideoDetails;
};
export default getVideoData;

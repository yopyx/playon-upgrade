import { CommentsListData } from "../../types/fetchedData";
import { CORS, YT_COMMENTS_API } from "../constants";

const getComments = async (videoId: string, nextToken = "") => {
  const url = CORS + encodeURIComponent(YT_COMMENTS_API(videoId, nextToken));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data as CommentsListData;
};
export default getComments;

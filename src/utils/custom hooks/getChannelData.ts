import { ChannelDetails } from "../../types/fetchedData";
import { CORS, YT_API_Channels } from "../constants";

const getChannelData = async (channelIds: string[]) => {
  const url =
    CORS + encodeURIComponent(YT_API_Channels.join(channelIds.join("%2C")));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.items as ChannelDetails[];
};
export default getChannelData;

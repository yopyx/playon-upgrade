import { FetchedVideoCardData, VideosListData } from "../../types/fetchedData";
import getChannelData from "./getChannelData";
const getVideosListById = async (ids: string[], apiKey: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/video-list?ids=${ids.join(
          "%2C"
        )}&apiKey=${apiKey}`
      : `http://localhost:3000/video-list?ids=${ids.join(
          "%2C"
        )}&apiKey=${apiKey}`;
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
export default getVideosListById;

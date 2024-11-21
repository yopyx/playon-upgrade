import { FetchedVideoCardData, VideosListData } from "../../types/fetchedData";
import getChannelData from "./getChannelData";
const getPopularVideos = async (
  categoryId: string,
  pageToken: string,
  apiKey: string
) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/popular-videos?categoryId=${categoryId}&nextToken=${pageToken}&apiKey=${apiKey}`
      : `http://localhost:3000/popular-videos?categoryId=${categoryId}&nextToken=${pageToken}&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const videosData = (await response.json()) as VideosListData;
  //const videosData = JSON.parse(data.contents) as VideosListData;
  console.log(videosData);
  const channelsData = await getChannelData(
    videosData.items.map((v) => v.snippet.channelId),
    apiKey
  );
  return { videosData, channelsData } as FetchedVideoCardData;
};

export default getPopularVideos;

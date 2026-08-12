import { VideoCardData, WatchedVideoWithStatus } from "../../types/fetchedData";
const getVideoByIdAsync = async (vidId: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/resources_api/watch_video?videoId=${vidId}`
      : `/resources_api/watch_video?videoId=${vidId}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      videoData: {} as VideoCardData,
      status: response.status,
    } as WatchedVideoWithStatus;
  }

  const videoData = (await response.json()) as VideoCardData;
  return {
    videoData,
    status: response.status,
  } as WatchedVideoWithStatus;
};

export default getVideoByIdAsync;

import {
  VideoCardListData,
  VideoCardListWithStatus,
} from "../../types/fetchedData";

const getPopularVideosAsync = async (categoryId: string, pageNum: number) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/resources_api/recommended_videos?VideoCategoryId=${categoryId}&pageNum=${pageNum}`
      : `/resources_api/recommended_videos?VideoCategoryId=${categoryId}&pageNum=${pageNum}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      videosData: { videoCardList: [], queryNextPage: false },
      status: response.status,
    } as VideoCardListWithStatus;
  }

  const videosData = (await response.json()) as VideoCardListData;
  //const videosData = JSON.parse(data.contents) as VideosListData;
  //console.log(videosData);
  return { videosData, status: response.status } as VideoCardListWithStatus;
};

export default getPopularVideosAsync;

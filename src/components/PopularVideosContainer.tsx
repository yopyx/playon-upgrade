import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "../types/reduxHooks";
import getPopularVideos from "../utils/custom hooks/getPopularVideos";
import { VideosListData } from "../types/fetchedData";
import VideoCard from "./VideoCard";
import { useMemo } from "react";

const PopularVideosContainer = () => {
  const vidCategoryData = useAppSelector(
    (store) => store.videoCategory.categoryDetails
  );

  const {
    data,
    status,
    error,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["popular videos", vidCategoryData.id],
    initialPageParam: "",
    getNextPageParam: (prevData: VideosListData) => prevData.nextPageToken,
    queryFn: ({ pageParam }) => getPopularVideos(vidCategoryData.id, pageParam),
  });
  const videoList = useMemo(() => {
    return data?.pages?.[0].items;
  }, [data]);
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="w-full flex flex-wrap gap-4 mx-auto ml-0">
      {videoList!.map((e) => (
        <div key={e.etag}>
          <VideoCard info={e} />
        </div>
      ))}
    </div>
  );
};

export default PopularVideosContainer;

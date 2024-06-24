import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "../types/reduxHooks";
import getPopularVideos from "../utils/custom hooks/getPopularVideos";
import { VideosListData } from "../types/fetchedData";

const PopularVideosContainer = () => {
  const vidCategoryId = useAppSelector(
    (store) => store.videoCategory.categoryDetails.id
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
    queryKey: ["popular videos"],
    initialPageParam: "",
    getNextPageParam: (prevData: VideosListData) => prevData.nextPageToken,
    queryFn: ({ pageParam }) => getPopularVideos(vidCategoryId, pageParam),
  });
  return <div>PopularVideosContainer</div>;
};

export default PopularVideosContainer;

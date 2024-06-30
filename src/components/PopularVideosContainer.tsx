import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import getPopularVideos from "../utils/custom hooks/getPopularVideos";
import { VideosListData } from "../types/fetchedData";
import VideoCard from "./VideoCard";
import VideoCardsShimmer from "./shimmer/VideoCardsShimmer";
import { Link } from "react-router-dom";
import { addVideo } from "../redux/videosDataSlice";
import getChannelData from "../utils/custom hooks/getChannelData";
import { useMemo } from "react";
import { addChannel } from "../redux/channelsDataSlice";

const PopularVideosContainer = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const vidCategoryData = useAppSelector(
    (store) => store.videoCategory.categoryDetails
  );
  const dispatch = useAppDispatch();
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
  const channelsData = useQuery({
    queryKey: ["channels", vidCategoryData.id],
    queryFn: () =>
      getChannelData(data!.pages?.[0].items.map((v) => v.snippet.channelId)),
    enabled: data?.pages?.[0].items !== null,
  });
  const videoList = useMemo(() => {
    return data?.pages?.[0].items;
  }, [data]);
  if (status === "pending") {
    return <VideoCardsShimmer len={6} />;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div
      className={`${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } flex flex-wrap gap-4`}
    >
      {videoList!.map((e) => (
        <Link
          to={`/watch?v=${e.id}`}
          key={e.etag}
          onClick={() => {
            dispatch(addVideo(e));
            channelsData?.data &&
              dispatch(
                addChannel(
                  channelsData?.data?.find?.(
                    (c) => e?.snippet?.channelId === c?.id
                  )
                )
              );
          }}
        >
          <VideoCard
            info={e}
            imgUrl={
              channelsData.isError
                ? ""
                : channelsData?.data?.find?.(
                    (c) => e?.snippet?.channelId === c?.id
                  )?.snippet?.thumbnails?.default?.url
            }
          />
        </Link>
      ))}
      {isFetchingNextPage ? <VideoCardsShimmer len={6} /> : null}
    </div>
  );
};

export default PopularVideosContainer;

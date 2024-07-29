import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import getPopularVideos from "../utils/custom hooks/getPopularVideos";
import { FetchedVideoCardData } from "../types/fetchedData";
import VideoCard from "./VideoCard";
import VideoCardsShimmer from "./shimmer/VideoCardsShimmer";
import { Link } from "react-router-dom";
import { addVideo } from "../redux/videosDataSlice";
import { useCallback, useMemo, useRef } from "react";
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
  const observer = useRef<IntersectionObserver>();
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
    getNextPageParam: (prevData: FetchedVideoCardData) =>
      prevData.videosData.nextPageToken,
    queryFn: ({ pageParam }) => getPopularVideos(vidCategoryData.id, pageParam),
  });
  const lastElement = useCallback(
    (node: HTMLAnchorElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );
  const videoList = useMemo(() => {
    return data?.pages.flatMap((page) => page.videosData.items);
  }, [data]);
  const channelList = useMemo(() => {
    return data?.pages.flatMap((page) => page.channelsData);
  }, [data]);
  if (status === "pending") {
    return (
      <VideoCardsShimmer
        len={collapsedSideBar ? 8 : 6}
        collapsedSideBar={collapsedSideBar}
      />
    );
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  //console.log(videoList);
  return (
    <div
      className={`${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } flex flex-wrap gap-4`}
    >
      {videoList!.map((e) => (
        <Link
          ref={lastElement}
          to={`/watch?v=${e.id}`}
          key={e.etag}
          onClick={() => {
            dispatch(addVideo(e));

            dispatch(
              addChannel(
                channelList?.find?.((c) => e?.snippet?.channelId === c?.id)
              )
            );
          }}
        >
          <VideoCard
            info={e}
            imgUrl={
              channelList?.find?.((c) => e?.snippet?.channelId === c?.id)
                ?.snippet?.thumbnails?.default?.url
            }
          />
        </Link>
      ))}
      {isFetchingNextPage && (
        <VideoCardsShimmer
          len={collapsedSideBar ? 8 : 6}
          collapsedSideBar={collapsedSideBar}
        />
      )}
    </div>
  );
};

export default PopularVideosContainer;

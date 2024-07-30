import { Link, useLocation } from "react-router-dom";
import DetailedVideoCard from "./DetailedVideoCard";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSearchResultedVideos from "../utils/custom hooks/getSearchResultedVideos";
import { useMemo } from "react";
import { addVideo } from "../redux/videosDataSlice";
import { addChannel } from "../redux/channelsDataSlice";

const VideosResultsContainer = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((store) => store.searchText.search);
  const {
    data,
    status,
    error,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [searchText],
    queryFn: ({ pageParam }) => getSearchResultedVideos(searchText, pageParam),
    initialPageParam: "",
    getNextPageParam: (prevData) => prevData.videosData.nextPageToken,
  });
  const list = useMemo(() => {
    return data?.pages.flatMap((page) => page.videosData.items);
  }, [data]);
  const channelsData = useMemo(() => {
    return data?.pages.flatMap((page) => page.channelsData);
  }, [data]);
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div
      className={`${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } flex flex-wrap space-x-4 space-y-10`}
    >
      <div
        className={
          (pathname === "/watch" ? "w-[400px]" : "w-[1320px]") +
          " flex justify-center"
        }
      >
        <div
          className={
            (pathname === "/watch" ? "w-[450px]" : "w-[1000px]") +
            " flex flex-col space-y-4 my-4"
          }
        >
          {list?.map((v) => (
            <Link
              to={"/watch?v=" + v?.id}
              key={v.etag}
              onClick={() => {
                dispatch(addVideo(v));
                dispatch(
                  addChannel(
                    channelsData?.find?.((c) => v?.snippet?.channelId === c?.id)
                  )
                );
              }}
            >
              <DetailedVideoCard
                info={v}
                channelData={channelsData?.find(
                  (c) => v.snippet.channelId === c.id
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosResultsContainer;

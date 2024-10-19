import { Link, useLocation } from "react-router-dom";
import DetailedVideoCard from "./DetailedVideoCard";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSearchResultedVideos from "../utils/functions/getSearchResultedVideos";
import { useCallback, useMemo, useRef } from "react";
import { addVideo } from "../redux/videosDataSlice";
import { addChannel } from "../redux/channelsDataSlice";
import NotFound from "./errorCatcher/NotFound";
import DetailedVideoCardsShimmer from "./shimmer/DetailedVideoCardsShimmer";
import { addSearchTag, addSuggestedCategory } from "../redux/searchTextSlice";
import { SearchSliceState } from "../types/slicesState";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import { updateQuota } from "../redux/ui_slices/quotaSlice";
import { useKey } from "./Body";

const VideosResultsContainer = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const apiKey = useKey();
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();
  const { searchTextStored, searchTag, suggestionCategory } = useAppSelector(
    (store) => store.searchText
  ) as SearchSliceState;
  const observer = useRef<IntersectionObserver>();
  const {
    data,
    status,
    isFetchingNextPage,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "search resulted videos",
      (pathname === "/watch"
        ? "/watch" + searchTag
        : search.split("=")[1].replace(/\+/g, " ") || searchTextStored) +
        suggestionCategory,
    ],
    queryFn: ({ pageParam }) => {
      dispatch(updateQuota(200));
      return getSearchResultedVideos(
        suggestionCategory === "All"
          ? pathname === "/watch"
            ? searchTag
            : search.split("=")[1].replace(/\+/g, " ") || searchTextStored
          : suggestionCategory,
        pageParam,
        apiKey
      );
    },
    initialPageParam: "",
    getNextPageParam: (prevData) => prevData.nextToken,
  });
  const lastElementRef = useCallback(
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
    [isLoading, isFetching, hasNextPage, fetchNextPage]
  );
  const list = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.videosData.items);
  }, [data]);
  const channelsData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.channelsData);
  }, [data]);
  if (status === "pending") {
    return (
      <div
        className={`${
          collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
        } ${
          pathname === "/watch" ? "my-4" : "my-10 ml-24"
        } flex flex-col gap-y-4 mx-auto`}
      >
        <DetailedVideoCardsShimmer len={6} />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div
        className={`${
          collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
        } ${
          pathname === "/watch" ? "my-4" : "my-10 ml-44"
        } flex flex-col gap-y-4 mx-auto`}
      >
        <NotFound />
      </div>
    );
  }

  return (
    <div
      className={`${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } ${
        pathname === "/watch" ? "my-4" : "my-10 ml-24"
      } flex flex-col gap-y-4 mx-auto`}
    >
      {(list || []).map((v, i) => (
        <Link
          to={"/watch?v=" + v?.id}
          ref={lastElementRef}
          key={v.etag + i}
          onClick={() => {
            console.log(v.snippet?.tags);
            dispatch(openCloseSidebar(true));
            dispatch(addVideo(v));
            dispatch(
              addChannel(
                (channelsData || []).find?.((c) => v.snippet.channelId === c.id)
              )
            );
            dispatch(addSearchTag(v.snippet?.tags?.[0] || v.snippet.title));
            dispatch(addSuggestedCategory("All"));
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
      {isFetchingNextPage && <DetailedVideoCardsShimmer len={6} />}
    </div>
  );
};

export default VideosResultsContainer;

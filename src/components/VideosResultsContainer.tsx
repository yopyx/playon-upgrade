import { Link, useNavigate } from "react-router-dom";
import DetailedVideoCard from "./DetailedVideoCard";
import { useAppDispatch } from "../types/reduxHooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSearchResultedVideos from "../utils/functions/getSearchResultedVideosAsync";
import { useCallback, useEffect, useMemo, useRef } from "react";
import NotFound from "./errorCatcher/NotFound";
import DetailedVideoCardsShimmer from "./shimmer/DetailedVideoCardsShimmer";
import { addSearchTag, addVideoTitle } from "../redux/searchTextSlice";
import { VideoCardData, VideoCardListWithStatus } from "../types/fetchedData";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";

const VideosResultsContainer = ({
  cards,
  pathname,
  searchQuery,
  selectedCategory,
  videoTitle,
}: {
  cards: VideoCardData[];
  pathname: string;
  searchQuery: string;
  selectedCategory: string;
  videoTitle: string;
}) => {
  const { lightTheme, sidebarState } = useUpdatedUi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      selectedCategory == "All" ? searchQuery : selectedCategory,
    ],
    queryFn: ({ pageParam }) => {
      return getSearchResultedVideos(
        selectedCategory == "All"
          ? pathname === "/results"
            ? searchQuery
            : videoTitle
          : selectedCategory,
        pageParam,
      );
    },
    initialPageParam: 2,
    getNextPageParam: (prevData: VideoCardListWithStatus, _y, lastPage) =>
      prevData.videosData.queryNextPage ? ++lastPage : undefined,
    enabled: cards !== undefined,
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
    [isLoading, isFetching, hasNextPage, fetchNextPage],
  );
  const list = useMemo(() => {
    return data?.pages.flatMap((page) => page.videosData.videoCardList);
  }, [data]);

  useEffect(() => {
    if (data?.pages.flatMap((page) => page.status)[0] === 401) {
      navigate("/signin");
    }
  }, [data?.pages, navigate]);

  // if (status === "pending") {
  //   return <DetailedVideoCardsShimmer len={6} />;
  // }
  return (
    <div
      className={`${
        sidebarState.resultsPage.collapseSidebar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      }${pathname === "/watch" ? "" : " ml-24"} flex flex-col mx-auto mt-20`}
    >
      {cards.map((v, i) => (
        <Link
          to={"/watch?v=" + v.videoId}
          ref={lastElementRef}
          key={v.etag + i}
          // onClick={() => {
          //   dispatch(
          //     v.tags.length && v.tags[0].trim()
          //       ? addSearchTag(v.tags[0])
          //       : addSearchTag(""),
          //   );
          //   dispatch(addSuggestedCategory("All"));
          //   window.scrollTo(0, 0);
          // }}
        ></Link>
      ))}
      {status === "pending" ? (
        <DetailedVideoCardsShimmer len={6} />
      ) : status === "error" ? (
        <NotFound />
      ) : (
        (list || []).map((v, i) => (
          <Link
            to={"/watch?v=" + v.videoId}
            ref={lastElementRef}
            key={v.etag + i}
            onClick={() => {
              dispatch(
                v.tags.length && v.tags[0].trim()
                  ? addSearchTag(v.tags[0])
                  : addSearchTag(""),
              );
              dispatch(addVideoTitle(v.title));
              //dispatch(addSuggestedCategory("All"));
              window.scrollTo(0, 0);
            }}
          >
            <DetailedVideoCard
              info={v}
              lightTheme={lightTheme}
              isPriority={i < 4}
            />
          </Link>
        ))
      )}
      {isFetchingNextPage && <DetailedVideoCardsShimmer len={6} />}
    </div>
  );
};
export default VideosResultsContainer;

import { Link, useNavigate } from "react-router";
import DetailedVideoCard from "./DetailedVideoCard";
import { useAppDispatch } from "../types/reduxHooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSearchResultedVideos from "../utils/functions/getSearchResultedVideosAsync";
import { useEffect, useMemo, useRef } from "react";
import DetailedVideoCardsShimmer from "./shimmer/DetailedVideoCardsShimmer";
import { addSearchTag, addVideoTitle } from "../redux/searchTextSlice";
import { VideoCardData, VideoCardListWithStatus } from "../types/fetchedData";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import NotFound from "./errorCatcher/NotFound";
import { setTranslatingValue } from "../redux/ui_slices/tagsResponsiveScrollSlice";
import { addSelectedCategory } from "../redux/videoCategorySlice";

const VideosResultsContainer = ({
  cards,
  effectiveQuery,
  hasSecondPage,
}: {
  cards: VideoCardData[];
  effectiveQuery: string | undefined;
  hasSecondPage: boolean | undefined;
}) => {
  const { lightTheme, sidebarState } = useUpdatedUi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);
  const { data, isFetchingNextPage, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["search resulted videos", effectiveQuery],
      queryFn: ({ pageParam }) => {
        return getSearchResultedVideos(effectiveQuery!, pageParam);
      },
      initialPageParam: 2,
      getNextPageParam: (
        prevData: VideoCardListWithStatus,
        _allPages,
        lastPage,
      ) => (prevData.videosData.queryNextPage ? ++lastPage : undefined),
      enabled: !!effectiveQuery && cards.length > 0 && hasSecondPage,
    });
  // const lastElementRef = useCallback(
  //   (node: HTMLAnchorElement) => {
  //     if (isLoading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && !isFetching && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLoading, isFetching, hasNextPage, fetchNextPage],
  // );
  const allVideos = useMemo(
    () => [
      ...cards,
      ...(data?.pages.flatMap((page) => page.videosData?.videoCardList ?? []) ??
        []),
    ],
    [cards, data],
  );

  useEffect(() => {
    if (data?.pages.some((page) => page.status === 401)) {
      navigate("/signin");
    }
  }, [data?.pages, navigate]);
  useEffect(() => {
    const node = sentinelRef.current;

    if (!node || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetchingRef.current) {
          fetchingRef.current = true;

          void fetchNextPage().then(
            () => {
              fetchingRef.current = false;
            },
            () => {
              fetchingRef.current = false;
            },
          );
        }
      },
      {
        rootMargin: "350px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching]);
  if (allVideos.length == 0) {
    return <NotFound />;
  }
  return (
    <div
      className={`${
        sidebarState.resultsPage.collapseSidebar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      } flex flex-col justify-center mx-auto mt-5`}
    >
      {allVideos.map((v, i) => (
        <Link
          to={"/watch?v=" + v.videoId}
          state={{ prevPath: location.pathname }}
          key={v.etag + i}
          onClick={() => {
            dispatch(
              v.tags.length && v.tags[0].trim()
                ? addSearchTag(v.tags[0])
                : addSearchTag(""),
            );
            dispatch(addVideoTitle(v.title));
            dispatch(addSelectedCategory("All"));
            dispatch(setTranslatingValue(["/watch", 0]));
            window.scrollTo(0, 0);
          }}
        >
          <DetailedVideoCard
            info={v}
            lightTheme={lightTheme}
            isPriority={i < 4}
          />
        </Link>
      ))}
      {hasNextPage && <div ref={sentinelRef} className="h-px" />}
      {isFetchingNextPage && <DetailedVideoCardsShimmer len={6} />}
    </div>
  );
};
export default VideosResultsContainer;

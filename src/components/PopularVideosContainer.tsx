import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import getPopularVideosAsync from "../utils/functions/getPopularVideosAsync";
import VideoCard from "./VideoCard";
import VideoCardsShimmer from "./shimmer/VideoCardsShimmer";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useRef } from "react";
import NotFound from "./errorCatcher/NotFound";
import { addVideoTitle } from "../redux/searchTextSlice";
import { VideoCardListWithStatus } from "../types/fetchedData";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";

const PopularVideosContainer = () => {
  const { lightTheme, sidebarState } = useUpdatedUi();
  const categoryId = useAppSelector(
    (store) => store.videoCategory.categoryDetails.id,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const observer = useRef<IntersectionObserver>();
  const {
    data,
    status,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["popular videos", categoryId],
    initialPageParam: 1,
    getNextPageParam: (prevData: VideoCardListWithStatus, _, lastPage) =>
      prevData.videosData.queryNextPage ? ++lastPage : undefined,
    queryFn: ({ pageParam }) => {
      return getPopularVideosAsync(categoryId, pageParam);
    },
    staleTime: 10 * 60 * 1000,
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
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );
  const videoList = useMemo(() => {
    return data?.pages.flatMap((page) => page.videosData.videoCardList);
  }, [data]);

  if (data?.pages.flatMap((page) => page.status)[0] === 401) {
    navigate("/signin");
  }

  if (status === "pending") {
    return (
      <VideoCardsShimmer
        collapsedSideBar={sidebarState.mainContainerPage.collapseSidebar}
      />
    );
  }
  if (
    status === "error" ||
    data?.pages.flatMap((page) => page.status)[0] === 404
  ) {
    return <NotFound />;
  }
  //console.log(videoList);
  return (
    <div
      className={`flex flex-wrap gap-4 mobile:video-container-centered 8k-3:video-container-centered 4k:video-container-centered 4k-2:video-container-centered`}
    >
      {videoList!.map((e, i) => (
        <Link
          ref={lastElement}
          to={`/watch?v=${e.videoId}`}
          key={e.etag + i}
          onClick={() => {
            dispatch(addVideoTitle(e.title));
            // dispatch(
            //   e.tags.length && e.tags[0].trim()
            //     ? addSearchTag(e.tags[0])
            //     : addSearchTag(""),
            // );
            window.scrollTo(0, 0);
          }}
        >
          <VideoCard info={e} lightTheme={lightTheme} isPriority={i < 4} />
        </Link>
      ))}
      {isFetchingNextPage && (
        <VideoCardsShimmer
          collapsedSideBar={sidebarState.mainContainerPage.collapseSidebar}
        />
      )}
    </div>
  );
};

export default PopularVideosContainer;

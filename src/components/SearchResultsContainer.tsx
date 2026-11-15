import { useLocation, useNavigate, useSearchParams } from "react-router";
import SuggestionsButtons from "./SuggestionsButtons";
import VideosResultsContainer from "./VideosResultsContainer";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import getSearchResultedVideosAsync from "../utils/functions/getSearchResultedVideosAsync";
import { useEffect, useMemo } from "react";
import SuggestionButtonsShimmer from "./shimmer/SuggestionButtonsShimmer";
import DetailedVideoCardsShimmer from "./shimmer/DetailedVideoCardsShimmer";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import { addSelectedCategory } from "../redux/videoCategorySlice";
import NotFound from "./errorCatcher/NotFound";

const SearchResultsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((store) => store.videoCategory);
  const { videoTitle } = useAppSelector((store) => store.searchText);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { sidebarState } = useUpdatedUi();
  const [effectiveQuery, searchQuery] = useMemo(() => {
    const searchQuery =
      pathname === "/results"
        ? searchParams.get("search_query")?.replace(/\+/g, " ")
        : videoTitle;
    return [
      (selectedCategory == "All" ? searchQuery : selectedCategory)?.trim(),
      searchQuery,
    ];
  }, [pathname, searchParams, videoTitle, selectedCategory]);
  const { data, status, isLoading } = useQuery({
    queryKey: ["search results", effectiveQuery],
    queryFn: () => {
      return getSearchResultedVideosAsync(effectiveQuery!, 1);
    },
    enabled: !!effectiveQuery,
  });
  const [list, firstAvailableTags] = useMemo(() => {
    const tags = data?.videosData?.videoCardList.find((v) => v.tags)?.tags;
    return [
      data?.videosData?.videoCardList ?? [],
      tags ? ["All", ...tags] : ["All"],
    ];
  }, [data?.videosData?.videoCardList]);

  // useEffect(() => {
  //   if (list) {
  //     searchQuery &&
  //       !videoTags[pathname == "/watch" ? "watchPage" : "resultsPage"][
  //         searchQuery
  //       ] &&
  //       dispatch(
  //         addVideoTags([
  //           pathname,
  //           searchQuery,
  //           list.find((v) => v?.tags.length > 0)?.tags || [],
  //         ]),
  //       );
  //   }
  // }, [dispatch, list, searchQuery, videoTags, pathname]);

  useEffect(() => {
    if (data?.status === 401) {
      navigate("/signin");
    }
  }, [data?.status, navigate]);

  useEffect(() => {
    return () => {
      dispatch(openCloseSidebar(["resultsPage", false]));
      dispatch(addSelectedCategory("All"));
    };
  }, [dispatch]);

  if (status === "error" || data?.status === 404) {
    return <NotFound />;
  }
  return (
    <div
      className={`flex flex-col gap-y-16 ${
        sidebarState.resultsPage.collapseSidebar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      }${
        pathname === "/watch"
          ? ""
          : " 8k-r:results-container-8k-r 4k-3:results-container-4k-3 laptop-r:results-container-laptop-r tablet-r:results-container-tablet-r mobile:results-container-mobile"
      }`}
    >
      {isLoading ? (
        <>
          <SuggestionButtonsShimmer />
          <DetailedVideoCardsShimmer len={6} />
        </>
      ) : (
        <>
          <SuggestionsButtons
            suggestedTags={firstAvailableTags}
            searchQuery={searchQuery}
          />
          <VideosResultsContainer
            cards={list || []}
            effectiveQuery={effectiveQuery}
            hasSecondPage={data?.videosData.queryNextPage}
          />
        </>
      )}
    </div>
  );
};

export default SearchResultsContainer;

import { useLocation, useNavigate } from "react-router";
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
import { addSelectedCategory, addVideoTags } from "../redux/videoCategorySlice";
import NotFound from "./errorCatcher/NotFound";

const SearchResultsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { videoTags, selectedCategory } = useAppSelector(
    (store) => store.videoCategory,
  );
  const { videoTitle } = useAppSelector((store) => store.searchText);
  const { pathname, search } = useLocation();
  const searchQuery =
    pathname === "/results"
      ? search.split("=")[1].replace(/\+/g, " ")
      : search.split("=")[1];
  const { sidebarState } = useUpdatedUi();
  const { data, status, isLoading } = useQuery({
    queryKey: [
      "search results",
      selectedCategory == "All" ? searchQuery : selectedCategory,
    ],
    queryFn: () => {
      return getSearchResultedVideosAsync(
        selectedCategory == "All"
          ? pathname === "/results"
            ? searchQuery
            : videoTitle
          : selectedCategory,
        1,
      );
    },
  });
  const list = useMemo(() => {
    return data?.videosData.videoCardList;
  }, [data?.videosData.videoCardList]);

  // const tags = useMemo(() => {
  //   const arr = list?.find((v) => v?.tags)?.tags || [];
  //   !videoTags[pathname == "/watch" ? "watchPage" : "resultsPage"][
  //     searchQuery
  //   ] && dispatch(addVideoTags([pathname, searchQuery, arr]));
  //   return arr;
  // }, [dispatch, list, pathname, searchQuery, videoTags]);
  useEffect(() => {
    if (list) {
      !videoTags[pathname == "/watch" ? "watchPage" : "resultsPage"][
        searchQuery
      ] &&
        dispatch(
          addVideoTags([
            pathname,
            searchQuery,
            list.find((v) => v?.tags.length > 0)?.tags || [],
          ]),
        );
    }
  }, [dispatch, list, searchQuery, videoTags, pathname]);

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
  }, []);

  if (status === "error" || data?.status === 404) {
    return <NotFound />;
  }
  return (
    <div
      className={`flex flex-col ${
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
          {list?.find((v) => v?.tags.length > 0) && <SuggestionsButtons />}
          <VideosResultsContainer
            cards={list || []}
            pathname={pathname}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            videoTitle={videoTitle}
          />
        </>
      )}
    </div>
  );
};

export default SearchResultsContainer;

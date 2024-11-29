import { useLocation } from "react-router-dom";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import getCategories from "../utils/functions/getCategories";
import { useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import getSearchResultedVideos from "../utils/functions/getSearchResultedVideos";
import SuggestionButtonsShimmer from "./shimmer/SuggestionButtonsShimmer";
import { updateQuota } from "../redux/ui_slices/quotaSlice";
import { useKey } from "./Body";

const SuggestionsButtons = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const { light } = useAppSelector((store) => store.theme);
  const apiKey = useKey();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const { searchTextStored, searchTag, suggestionCategory } = useAppSelector(
    (store) => store.searchText
  );
  const vidCategory: string = useAppSelector(
    (store) => store.videoCategory.categoryDetails.snippet?.title
  );
  const [clickedBtn, setClickedBtn] = useState(
    (pathname === "/" ? "All" : suggestionCategory) || "All"
  );
  const leftScroll = () => {
    if (categoriesScrollRef.current) {
      categoriesScrollRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };
  const rightScroll = () => {
    if (categoriesScrollRef.current) {
      categoriesScrollRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };
  const handleScroll = () => {
    if (categoriesScrollRef.current) {
      setTranslateValue(categoriesScrollRef.current.scrollLeft);
      if (
        categoriesScrollRef.current?.scrollLeft >=
        categoriesScrollRef.current?.scrollWidth -
          categoriesScrollRef.current?.clientWidth
      ) {
        setMaxTranslation(true);
      } else {
        setMaxTranslation(false);
      }
    }
  };

  const popularSuggestionsQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      dispatch(updateQuota(100));
      return getCategories(apiKey);
    },
    enabled: pathname === "/",
  });
  const searchSuggestionsQuery = useQuery({
    queryKey: [
      "suggestion buttons",
      pathname === "/watch" ? searchTag : searchTextStored,
    ],
    queryFn: () => {
      dispatch(updateQuota(100));
      return getSearchResultedVideos(
        pathname === "/watch" ? searchTag : searchTextStored,
        "",
        apiKey
      );
    },
    enabled: pathname !== "/",
  });
  const popularList = useMemo(() => {
    return popularSuggestionsQuery.data;
  }, [popularSuggestionsQuery]);
  const recommendedList = useMemo(() => {
    return (
      searchSuggestionsQuery.data?.data?.videosData?.items.find(
        (v) => v.snippet.tags
      )?.snippet.tags || []
    );
  }, [searchSuggestionsQuery.data?.data.videosData?.items]);

  if (popularSuggestionsQuery.isLoading || searchSuggestionsQuery.isLoading) {
    return <SuggestionButtonsShimmer />;
  }
  if (popularSuggestionsQuery.isError || searchSuggestionsQuery.isError) {
    return (
      <div>
        {JSON.stringify(
          popularSuggestionsQuery.isError
            ? popularSuggestionsQuery.error
            : searchSuggestionsQuery.error
        )}
      </div>
    );
  }
  return (
    <div
      className={`${
        pathname === "/watch"
          ? "relative w-[420px] 8k:suggestions-watch-8k 8k-w:suggestions-watch-8k-w 4k-w:suggestions-watch-4k-w 4k-2:suggestions-watch-4k-2 laptop-r:suggestions-watch-laptop-r sub3:w-full"
          : `sticky mobile:suggestion-buttons-mobile${
              pathname === "/" && !collapsedSideBar
                ? " 4k-3:suggestion-buttons-4k-3"
                : ""
            }
             `
      } top-16 py-5 z-10`}
    >
      <div className={`w-full flex absolute justify-between sub6:hidden`}>
        <button
          className={`bg-stone-100 ${
            translateValue > 0 ? "opacity-100" : "opacity-0"
          } p-3 rounded-full z-30 hover:bg-stone-400`}
          onClick={leftScroll}
        >
          <img
            alt="RIGHT_ARROW"
            src={"/arrow-prev-small-svgrepo-com.svg"}
            className="w-4 h-4"
          />
        </button>

        <button
          className={`bg-stone-100 ${
            maxTranslation ? "opacity-0" : "opacity-100"
          } p-3 rounded-full z-30 hover:bg-stone-400`}
          onClick={rightScroll}
        >
          <img
            alt="LEFT_ARROW"
            src={"/arrow-next-small-svgrepo-com.svg"}
            className="w-4 h-4"
          />
        </button>
      </div>
      <div
        className="mx-auto flex gap-x-2 overflow-x-hidden sub6:overflow-x-scroll"
        ref={categoriesScrollRef}
        onScroll={handleScroll}
      >
        <Button
          key={"All"}
          categoryData={{ id: "0", snippet: { title: "All" } }}
          title={"All"}
          clicked={clickedBtn === "All"}
          setClicked={setClickedBtn}
          lightTheme={light}
        />
        {pathname === "/"
          ? popularList!.map((c) => (
              <Button
                key={c.etag}
                categoryData={c}
                title={c.snippet.title}
                clicked={clickedBtn === c.snippet.title}
                setClicked={setClickedBtn}
                lightTheme={light}
              />
            ))
          : recommendedList!.map((c, i) => (
              <Button
                key={c + i}
                title={c}
                clicked={clickedBtn === c}
                setClicked={setClickedBtn}
                lightTheme={light}
              />
            ))}
      </div>
    </div>
  );
};

export default SuggestionsButtons;

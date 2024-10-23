import { useLocation } from "react-router-dom";
import { LEFT_ARROW, RIGHT_ARROW } from "../utils/constants";
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
    (pathname === "/" ? vidCategory : suggestionCategory) || "All"
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
      className={`${pathname === "/watch" ? "relative " : "sticky "}${
        pathname === "/watch"
          ? "w-[420px]"
          : collapsedSideBar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      } top-16 py-5 z-10`}
    >
      <div className={`w-full flex absolute justify-between`}>
        <button
          className={`bg-stone-100 ${
            translateValue > 0 ? "opacity-100" : "opacity-0"
          } p-3 px-3.5 rounded-full z-30 hover:bg-stone-400`}
          onClick={leftScroll}
        >
          <img alt="RIGHT_ARROW" src={RIGHT_ARROW} className="w-1.5" />
        </button>

        <button
          className={`bg-stone-100 ${
            maxTranslation ? "opacity-0" : "opacity-100"
          } p-3 px-3.5 rounded-full z-30 hover:bg-stone-400`}
          onClick={rightScroll}
        >
          <img alt="LEFT_ARROW" src={LEFT_ARROW} className="w-1.5" />
        </button>
      </div>
      <div
        className="w-[95%] mx-auto flex gap-x-2 overflow-x-hidden"
        ref={categoriesScrollRef}
        onScroll={handleScroll}
      >
        <Button
          key={"All"}
          categoryData={{ id: "0", snippet: { title: "All" } }}
          title={"All"}
          clicked={clickedBtn === "All"}
          setClicked={setClickedBtn}
        />
        {pathname === "/"
          ? popularList!.map((c) => (
              <Button
                key={c.etag}
                categoryData={c}
                title={c.snippet.title}
                clicked={clickedBtn === c.snippet.title}
                setClicked={setClickedBtn}
              />
            ))
          : recommendedList!.map((c, i) => (
              <Button
                key={c + i}
                title={c}
                clicked={clickedBtn === c}
                setClicked={setClickedBtn}
              />
            ))}
      </div>
    </div>
  );
};

export default SuggestionsButtons;

import { useLocation, useNavigate } from "react-router";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import getCategoriesAsync from "../utils/functions/getCategoriesAsync";
import { useEffect, useMemo, useRef, useState } from "react";
import SuggestionButtonsShimmer from "./shimmer/SuggestionButtonsShimmer";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { addVideoTags } from "../redux/videoCategorySlice";
import { setTranslatingValue } from "../redux/ui_slices/tagsResponsiveScrollSlice";

const SuggestionsButtons = ({
  suggestedTags,
  searchQuery,
}: {
  suggestedTags: string[] | undefined;
  searchQuery: string | undefined;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { videoTags, selectedCategory } = useAppSelector(
    (store) => store.videoCategory,
  );
  const tagstransverseValue = useAppSelector((store) => store.tagsUi);
  const { sidebarState } = useUpdatedUi();
  const { pathname } = useLocation();
  //const previousPathname = location.state?.prevPath || "/";
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const [clickedBtn, setClickedBtn] = useState(selectedCategory);
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
      dispatch(
        setTranslatingValue([pathname, categoriesScrollRef.current.scrollLeft]),
      );
      //const x = categoriesScrollRef.current?.scrollLeft;
      if (
        translateValue >=
          categoriesScrollRef.current?.scrollWidth -
            categoriesScrollRef.current?.clientWidth ||
        translateValue + 5 >=
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
    queryFn: () => getCategoriesAsync(),
    enabled: pathname === "/",
    // staleTime: 10 * 60 * 1000,
  });

  const popularList = useMemo(() => {
    return popularSuggestionsQuery.data?.categories;
  }, [popularSuggestionsQuery]);

  useEffect(() => {
    const translatedByValue =
      tagstransverseValue[
        pathname == "/"
          ? "mainPage"
          : pathname == "/watch"
            ? "watchPage"
            : "resultsPage"
      ].translatedByValue;
    if (categoriesScrollRef.current && translatedByValue) {
      categoriesScrollRef.current.scrollLeft = translatedByValue;
    }
  }, []);
  useEffect(() => {
    if (
      pathname !== "/" &&
      selectedCategory == "All" &&
      videoTags[pathname == "/watch" ? "watchPage" : "resultsPage"]?.[
        searchQuery!
      ] +
        "" !==
        suggestedTags + ""
    ) {
      dispatch(addVideoTags([pathname, searchQuery, suggestedTags]));
    }
  }, [
    pathname,
    selectedCategory,
    dispatch,
    suggestedTags,
    searchQuery,
    videoTags,
  ]);

  if (popularSuggestionsQuery.data?.status === 401) {
    navigate("/signin");
  }
  if (pathname == "/" && popularSuggestionsQuery.isLoading) {
    return <SuggestionButtonsShimmer />;
  }
  if (popularSuggestionsQuery.isError) {
    //return <div>{JSON.stringify(popularSuggestionsQuery.error)}</div>;
    return <h2>No suggestions available</h2>;
  }
  return (
    <div
      className={`${
        pathname === "/watch"
          ? "relative w-[420px] 8k:suggestions-watch-8k 8k-w:suggestions-watch-8k-w 4k-w:suggestions-watch-4k-w 4k-2:suggestions-watch-4k-2 laptop-r:suggestions-watch-laptop-r sub3:w-full"
          : `sticky mobile:suggestion-buttons-mobile${
              pathname === "/" &&
              !sidebarState.mainContainerPage.collapseSidebar
                ? " 4k-3:suggestion-buttons-4k-3"
                : ""
            }
             `
      } top-16 py-5 z-10`}
    >
      <div className={`w-full flex absolute justify-between sub6:hidden`}>
        <button
          className={`bg-stone-100${
            translateValue > 0 ? " z-30" : " -z-10"
          } p-3 rounded-full hover:bg-stone-400`}
          onClick={leftScroll}
        >
          <img
            alt="RIGHT_ARROW"
            src={"/arrow-prev-small-svgrepo-com.svg"}
            className="w-3.5 h-3.5"
          />
        </button>

        <button
          className={`bg-stone-100${
            maxTranslation ? " -z-10" : " z-30"
          } p-3 rounded-full hover:bg-stone-400`}
          onClick={rightScroll}
        >
          <img
            alt="LEFT_ARROW"
            src={"/arrow-next-small-svgrepo-com.svg"}
            className="w-3.5 h-3.5"
          />
        </button>
      </div>
      <div
        className="mx-auto flex gap-x-2 overflow-x-hidden sub6:overflow-x-scroll"
        ref={categoriesScrollRef}
        onScroll={handleScroll}
      >
        {/* <Button
          key={"All"}
          categoryData={{ id: "0", title: "All" }}
          title={"All"}
          clicked={clickedBtn === "All"}
          setClicked={setClickedBtn}
        /> */}
        {pathname === "/"
          ? popularList!.map((c) => (
              <Button
                key={c.etag || c.id}
                categoryData={c}
                title={c.title}
                clicked={clickedBtn === c.title}
                setClicked={setClickedBtn}
              />
            ))
          : (selectedCategory !== "All" && searchQuery
              ? videoTags[pathname == "/watch" ? "watchPage" : "resultsPage"][
                  searchQuery
                ]
              : suggestedTags
            )?.map((c: string, i: number) => (
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

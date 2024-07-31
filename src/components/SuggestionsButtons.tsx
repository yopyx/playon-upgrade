import { useLocation } from "react-router-dom";
import { LEFT_ARROW, RIGHT_ARROW } from "../utils/constants";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import getCategories from "../utils/custom hooks/getCategories";
import { useMemo, useRef, useState } from "react";
import { useAppSelector } from "../types/reduxHooks";
import getSearchResultedVideos from "../utils/custom hooks/getSearchResultedVideos";

const SuggestionsButtons = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const { pathname } = useLocation();
  const [clickedBtn, setClickedBtn] = useState("All");
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const searchText = useAppSelector((store) => store.searchText.search);
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
    queryFn: () => getCategories(),
    enabled: pathname === "/",
  });
  const searchSuggestionsQuery = useQuery({
    queryKey: ["suggestion buttons", searchText],
    queryFn: () => getSearchResultedVideos(searchText, ""),
    enabled: pathname !== "/",
  });
  const popularList = useMemo(() => {
    return popularSuggestionsQuery.data;
  }, [popularSuggestionsQuery]);
  const recommendedList = useMemo(() => {
    return (
      searchSuggestionsQuery.data?.videosData?.items.find((v) => v.snippet.tags)
        ?.snippet.tags || []
    );
  }, [searchSuggestionsQuery.data?.videosData?.items]);

  if (popularSuggestionsQuery.isLoading || searchSuggestionsQuery.isLoading) {
    return <div>Loading...</div>;
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
      className={`${pathname.startsWith("/watch") ? "" : "sticky top-16 "}${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } py-5 bg-white`}
    >
      <div className={`w-full flex absolute justify-between`}>
        <button
          className={`bg-white bg-opacity-80 opacity-${
            translateValue > 0 ? "opacity-100" : "opacity-0"
          } p-3 px-3.5 rounded-full z-30 hover:bg-stone-100`}
          onClick={leftScroll}
        >
          <img alt="RIGHT_ARROW" src={RIGHT_ARROW} className="w-1.5" />
        </button>

        {maxTranslation ? null : (
          <button
            className="bg-white bg-opacity-80 p-3 px-3.5 rounded-full z-30 hover:bg-stone-100"
            onClick={rightScroll}
          >
            <img alt="LEFT_ARROW" src={LEFT_ARROW} className="w-1.5" />
          </button>
        )}
      </div>
      <div
        className="w-full flex gap-x-2 overflow-x-hidden"
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
        {/* <Button
          key={"Live Streaming"}
          categoryData={{ id: "22", snippet: { title: "Live Streaming" } }}
          clicked={clickedBtn === "Live Streaming"}
          setClicked={setClickedBtn}
        /> */}
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

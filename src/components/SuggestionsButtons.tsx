import { useLocation } from "react-router-dom";
import { LEFT_ARROW, RIGHT_ARROW } from "../utils/constants";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import getCategories from "../utils/custom hooks/getCategories";
import { useRef, useState } from "react";

const SuggestionsButtons = () => {
  const { pathname } = useLocation();
  const [clickedBtn, setClickedBtn] = useState("All");
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
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
  console.log(translateValue);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div
      className={
        (pathname === "/watch" ? "" : "sticky top-14 ") + "w-[80vw] flex"
      }
    >
      <div
        className={`w-full flex absolute ${
          translateValue ? "justify-between" : "justify-end"
        }`}
      >
        {translateValue ? (
          <button
            className="bg-white bg-opacity-80 p-3 px-3.5 rounded-full z-20 hover:bg-stone-100"
            onClick={leftScroll}
          >
            <img alt="RIGHT_ARROW" src={RIGHT_ARROW} className="w-1.5" />
          </button>
        ) : null}
        {maxTranslation ? null : (
          <button
            className="bg-white bg-opacity-80 p-3 px-3.5 rounded-full z-20 hover:bg-stone-100"
            onClick={rightScroll}
          >
            <img alt="LEFT_ARROW" src={LEFT_ARROW} className="w-1.5" />
          </button>
        )}
      </div>
      <div
        className="flex space-x-2 px-5 overflow-x-hidden z-10"
        ref={categoriesScrollRef}
        onScroll={handleScroll}
      >
        <Button
          key={"All"}
          category={"All"}
          clicked={clickedBtn === "All"}
          setClicked={setClickedBtn}
        />
        <Button
          key={"Live Stream"}
          category={"Live Stream"}
          clicked={clickedBtn === "Live Stream"}
          setClicked={setClickedBtn}
        />
        {data?.map((c) => (
          <Button
            key={c.etag}
            category={c.snippet.title}
            clicked={clickedBtn === c.snippet.title}
            setClicked={setClickedBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsButtons;

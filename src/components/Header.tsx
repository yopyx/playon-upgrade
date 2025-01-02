import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { toggleSidebarView } from "../redux/ui_slices/sideBarResponsiveSlice";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestions from "../utils/functions/getSearchSuggestions";
import { addSuggestions } from "../redux/autoCompleteSearchSuggestionsSlice";
import { addSearchText, addSuggestedCategory } from "../redux/searchTextSlice";
import { SearchSuggestionsState } from "../types/slicesState";
import { toggleTheme } from "../redux/ui_slices/themeSlice";
import { HeaderProps } from "../types/props";
import { addCategoryDetails } from "../redux/videoCategorySlice";

const Header = ({ lightTheme }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchState: SearchSuggestionsState = useAppSelector(
    (store) => store.searchSuggestions
  );
  const searchText = useAppSelector(
    (store) => store.searchText.searchTextStored
  );
  const { light } = useAppSelector((store) => store.theme);
  const searchRef = useRef<HTMLInputElement>(null);
  const [suggestedText, setSuggestedText] = useState(["", -1]);
  const [text, setText] = useState(pathname === "/watch" ? "" : searchText);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data } = useQuery({
    queryKey: ["search input", text],
    queryFn: () => {
      setSuggestedText(["", -1]);
      return getSearchSuggestions(text || "");
    },
    enabled: text !== "",
  });
  const list = useMemo(() => {
    return data?.suggestions || searchState[text];
  }, [searchState, data, text]);
  return (
    <div
      className={`w-screen grid grid-flow-col space-x-32 p-3 mx-auto shadow-lg fixed z-40 mobile:header-mobile ${
        lightTheme ? "bg-stone-200" : "dark-highlight-color"
      }`}
    >
      <div className="w-full flex space-x-6 grid-cols-3 mobile:space-x-0">
        <div
          className="rounded-icon h-5 mobile:nav-button-mobile"
          onClick={() => dispatch(toggleSidebarView())}
        >
          <img
            alt="menu icon"
            src={"/Hamburger_icon.svg"}
            className="object-cover"
          />
        </div>
        <a
          href="/"
          onClick={() => {
            dispatch(addSuggestedCategory("All"));
            dispatch(
              addCategoryDetails({ id: "0", snippet: { title: "All" } })
            );
            dispatch(addSearchText(""));
          }}
        >
          <div className="w-28 h-6 mt-2 mobile:logo-mobile tablet-s:logo-tablet-s">
            <img alt="logo" src={"/play-on.png"} className="object-cover" />
          </div>
        </a>
      </div>
      <div className="grid-cols-3 flex h-[37.5px]">
        <div className="flex flex-col" onFocus={() => setShowSuggestions(true)}>
          <input
            type="text"
            ref={searchRef}
            value={suggestedText[0] || text}
            placeholder="Search"
            className="pl-5 border py-1.5 border-stone-400 rounded-l-full w-[45rem] sub1:search-bar-sub1 tablet:search-bar-tablet tablet-s:search-bar-tablet-s laptop-l:search-bar-laptop-l mobile:search-bar-mobile"
            onChange={(e) => {
              if (
                !suggestedText[0] ||
                suggestedText[0] !== e.currentTarget.value
              ) {
                setText(e.currentTarget.value);
              }
              data && dispatch(addSuggestions(data));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowSuggestions(false);
                if (text) {
                  dispatch(addSearchText(e.currentTarget.value));
                  dispatch(addSuggestedCategory("All"));
                  navigate(
                    "/results?search_query=" +
                      e.currentTarget.value.trim().replace(/ /g, "+")
                  );
                }
              }
              if (e.key === "ArrowUp") {
                const index =
                  +suggestedText[1] > 0
                    ? +suggestedText[1] - 1
                    : list.length - 1;
                setSuggestedText([list[index], index]);
              }
              if (e.key === "ArrowDown") {
                const index =
                  +suggestedText[1] === list.length - 1
                    ? 0
                    : +suggestedText[1] + 1;
                setSuggestedText([list[index], index]);
              }
            }}
          />
          {showSuggestions && data?.suggestions && (
            <>
              <ul
                className={
                  "bg-stone-200 py-1.5 font-semibold shadow-2xl rounded-xl border-stone-200 duration-500 tablet-s:li-suggestions-s mobile:li-suggestions-s"
                }
              >
                {list?.map((s, i) => (
                  <li
                    key={s}
                    className={`px-2 py-1.5 hover:cursor-default hover:bg-stone-100${
                      +suggestedText[1] === i ? " bg-stone-100" : ""
                    }`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setText(s);
                      dispatch(addSearchText(s));
                      dispatch(addSuggestedCategory("All"));
                      navigate("/results?search_query=" + s.replace(/ /g, "+"));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowSuggestions(false);
                        setText(s);
                        dispatch(addSearchText(s));
                        dispatch(addSuggestedCategory("All"));
                        navigate(
                          "/results?search_query=" + s.replace(/ /g, "+")
                        );
                      }
                    }}
                  >
                    <span
                      className={`${
                        lightTheme ? "text-gray-500" : "text-yellow-600"
                      } text-xl font-thin scale-x-[-1] px-2 mobile:hidden tablet-s:hidden`}
                    >
                      ⌕‍{" "}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button
          className="bg-stone-100 text-3xl text-stone-400 scale-x-[-1] border border-stone-400 px-5 rounded-l-full hover:bg-stone-200 mobile:hidden tablet-s:hidden"
          onClick={() => {
            setShowSuggestions(false);
            if (text) {
              dispatch(addSearchText(searchRef.current?.value));
              dispatch(addSuggestedCategory("All"));
              navigate(
                "/results?search_query=" +
                  searchRef.current!.value.replace(/ /g, "+")
              );
            }
          }}
        >
          ⌕‍
        </button>
      </div>
      <div className="grid-cols-4 flex space-x-7 tablet-s:space-x-2 mobile:-space-x-1">
        <div className="rounded-icon sub4:hidden">
          <img
            alt="start video"
            src={"/add-video-icon.png"}
            className={`object-cover${lightTheme ? "" : " invert"}`}
          />
        </div>
        <div className="rounded-icon sub4:hidden">
          <img
            alt="notification"
            src={"/notification.svg"}
            className={`object-cover${lightTheme ? "" : " invert"}`}
          />
        </div>
        <div
          className="rounded-icon mobile:nav-button-mobile tablet-s:nav-button-tablet-s"
          onClick={() => dispatch(toggleTheme())}
        >
          <img
            alt="theme"
            src={light ? "./moon.svg" : "./sun.svg"}
            className={`object-cover${lightTheme ? "" : " invert"}`}
          />
        </div>
        <div className="rounded-icon mobile:nav-button-mobile tablet-s:nav-button-tablet-s">
          <img
            alt="profile"
            src={"/profile-user.svg"}
            className={`object-cover${lightTheme ? "" : " invert"}`}
          />
        </div>
      </div>

      {showSuggestions && (
        <div
          className="absolute w-screen h-screen -z-10"
          onClick={() => {
            setShowSuggestions(false);
            setText(suggestedText[0]);
            setSuggestedText(["", -1]);
          }}
        ></div>
      )}
    </div>
  );
};

export default Header;

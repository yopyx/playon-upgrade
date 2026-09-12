import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { toggleSidebarView } from "../redux/ui_slices/sideBarResponsiveSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestionsAsync from "../utils/functions/getSearchSuggestionsAsync";
import { addSearchTextShown } from "../redux/searchTextSlice";
import { toggleTheme } from "../redux/ui_slices/themeSlice";
import { HeaderProps } from "../types/props";
import { addSelectedCategory } from "../redux/videoCategorySlice";
import getUserInfoAsync from "../utils/functions/getUserInfoAsync";
import { setUser } from "../redux/userSlice";

const Header = ({ lightTheme }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { searchTextShown } = useAppSelector((store) => store.searchText);
  const { light } = useAppSelector((store) => store.theme);
  const searchRef = useRef<HTMLInputElement>(null);
  const [focusedSuggestedText, setFocusedSuggestedText] = useState(["", -1]);
  const [text, setText] = useState(searchTextShown);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAsync(),
    enabled: pathname !== "/signin",
    refetchOnWindowFocus: false,
  });
  const searchSuggestionsQuery = useQuery({
    queryKey: ["search input", text],
    queryFn: () => {
      setFocusedSuggestedText(["", -1]);
      return getSearchSuggestionsAsync(text);
    },
    enabled: pathname !== "/signin" && text.trim() !== "",
  });
  const list = useMemo(() => {
    return searchSuggestionsQuery.data?.searchSuggestions?.suggestions;
  }, [searchSuggestionsQuery.data?.searchSuggestions?.suggestions]);
  useEffect(() => {
    dispatch(setUser(data?.username));
  }, [data?.username, dispatch]);
  return (
    <div
      className={`w-screen grid grid-flow-col space-x-32 p-3 mx-auto shadow-lg fixed z-40 mobile:header-mobile ${
        lightTheme ? "bg-stone-200" : "dark-highlight-color"
      }`}
    >
      <div className="w-full flex space-x-6 grid-cols-3 mobile:space-x-0">
        <div
          className="rounded-icon h-5 mobile:nav-button-mobile"
          onClick={() =>
            dispatch(
              toggleSidebarView(
                pathname == "/"
                  ? "mainContainerPage"
                  : pathname == "/results"
                    ? "resultsPage"
                    : pathname == "/history"
                      ? "historyPage"
                      : "watchPage",
              ),
            )
          }
        >
          <img
            alt="menu icon"
            src={"/Hamburger_icon.svg"}
            className="object-cover"
          />
        </div>
        <Link to="/">
          <div className="w-28 h-6 mt-2 mobile:logo-mobile tablet-s:logo-tablet-s">
            <img alt="logo" src={"/play-on.png"} className="object-cover" />
          </div>
        </Link>
      </div>
      <div className="grid-cols-3 flex h-[37.5px]">
        <div className="flex flex-col" onFocus={() => setShowSuggestions(true)}>
          <input
            type="text"
            ref={searchRef}
            value={focusedSuggestedText[0] || text}
            placeholder="Search"
            className="pl-5 border py-1.5 border-stone-400 rounded-l-full w-[45rem] sub1:search-bar-sub1 tablet:search-bar-tablet tablet-s:search-bar-tablet-s laptop-l:search-bar-laptop-l mobile:search-bar-mobile"
            onChange={(e) => {
              if (
                !focusedSuggestedText[0] ||
                focusedSuggestedText[0] !== e.currentTarget.value
              ) {
                setText(e.currentTarget.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowSuggestions(false);
                if (text) {
                  dispatch(addSearchTextShown(e.currentTarget.value));
                  dispatch(addSelectedCategory("All"));
                  navigate(
                    "/results?search_query=" +
                      e.currentTarget.value.trim().replace(/ /g, "+"),
                  );
                }
              }
              if (e.key === "ArrowUp" && list) {
                const index =
                  +focusedSuggestedText[1] > 0
                    ? +focusedSuggestedText[1] - 1
                    : list.length - 1;
                setFocusedSuggestedText([list[index], index]);
              }
              if (e.key === "ArrowDown" && list) {
                const index =
                  +focusedSuggestedText[1] === list.length - 1
                    ? 0
                    : +focusedSuggestedText[1] + 1;
                setFocusedSuggestedText([list[index], index]);
              }
            }}
          />
          {showSuggestions && list && (
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
                      +focusedSuggestedText[1] === i ? " bg-stone-100" : ""
                    }`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setText(s);
                      dispatch(addSearchTextShown(s));
                      dispatch(addSelectedCategory("All"));
                      navigate("/results?search_query=" + s.replace(/ /g, "+"));
                      window.scrollTo(0, 0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowSuggestions(false);
                        setText(s);
                        dispatch(addSearchTextShown(s));
                        dispatch(addSelectedCategory("All"));
                        navigate(
                          "/results?search_query=" + s.replace(/ /g, "+"),
                        );
                        window.scrollTo(0, 0);
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
              dispatch(addSearchTextShown(searchRef.current?.value));
              dispatch(addSelectedCategory("All"));

              navigate(
                "/results?search_query=" +
                  searchRef.current!.value.replace(/ /g, "+"),
              );
              window.scrollTo(0, 0);
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
        <div className="flex">
          <div className="hidden rounded-icon mobile:nav-button-mobile tablet-s:nav-button-tablet-s">
            <img
              alt="profile"
              src={"/profile-user.svg"}
              className={`object-cover${lightTheme ? "" : " invert"}`}
            />
          </div>
          {data?.username && (
            <h5
              className={`${light ? "" : "text-yellow-600 "}font-semibold align-middle my-auto mobile:hidden tablet-s:hidden`}
            >
              {data.username}
            </h5>
          )}
        </div>
        <div className="border-2 border-violet-800 hover:bg-white">
          <button
            className="px-1 py-1 font-bold text-yellow-600"
            onClick={() => {
              window.open("http://localhost:7117/logout", "_self");
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div
          className="absolute w-screen h-screen -z-10"
          onClick={() => {
            setShowSuggestions(false);
            setText(focusedSuggestedText[0] as string);
            setFocusedSuggestedText(["", -1]);
          }}
        ></div>
      )}
    </div>
  );
};

export default Header;

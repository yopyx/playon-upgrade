import { useLocation, useNavigate } from "react-router-dom";
import {
  CREATE_VIDEO,
  HAMBURGER_ICON,
  NOTIFY_BELL,
  USER_LOGO,
  YOUTUBE_LOGO,
} from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { toggleSidebarView } from "../redux/ui_slices/sideBarResponsiveSlice";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestions from "../utils/functions/getSearchSuggestions";
import { addSuggestions } from "../redux/autoCompleteSearchSuggestionsSlice";
import { addSearchText, addSuggestedCategory } from "../redux/searchTextSlice";
import { SearchSuggestionsState } from "../types/slicesState";
import { updateQuota } from "../redux/ui_slices/quotaSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchState: SearchSuggestionsState = useAppSelector(
    (store) => store.searchSuggestions
  );
  const searchText = useAppSelector(
    (store) => store.searchText.searchTextStored
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(pathname === "/watch" ? "" : searchText);
  const [index, setIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data } = useQuery({
    queryKey: [text],
    queryFn: () => {
      dispatch(updateQuota(100));
      return getSearchSuggestions(text || "");
    },
    enabled: text !== "",
  });
  const list = useMemo(() => {
    return data?.suggestions || searchState[text];
  }, [searchState, data, text]);
  return (
    <div className="w-[98vw] grid grid-flow-col p-3 m-2 mt-0 shadow-lg bg-white fixed z-30">
      <div className="flex space-x-6 col-span-2">
        <div
          className="rounded-icon"
          onClick={() => dispatch(toggleSidebarView())}
        >
          <img alt="menu icon" src={HAMBURGER_ICON} className="h-5" />
        </div>
        <a
          href="/"
          onClick={() => {
            dispatch(addSuggestedCategory("All"));
            dispatch(addSearchText(""));
          }}
        >
          <img alt="logo" src={YOUTUBE_LOGO} className="h-6 mt-2" />
        </a>
      </div>
      <div className="flex col-span-8 place-content-center mr-32 h-[41px]">
        <div
          className="flex flex-col w-[70%]"
          onFocus={() => setShowSuggestions(true)}
        >
          <input
            type="text"
            ref={searchRef}
            value={index > -1 ? list?.[index] : text}
            placeholder="Search"
            className="pl-5 border py-2 border-stone-400 rounded-l-full"
            onChange={(e) => {
              if (index === -1) {
                setText(e.currentTarget.value);
                data && dispatch(addSuggestions(data));
              }
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
                setIndex(index > -1 ? index - 1 : list.length - 1);
              }
              if (e.key === "ArrowDown") {
                setIndex(index < list.length - 1 ? index + 1 : -1);
              }
            }}
          />
          {showSuggestions && data?.suggestions && (
            <>
              <ul
                className={
                  "bg-white py-1.5 font-semibold shadow-2xl rounded-xl border-stone-200 duration-500"
                }
              >
                {list?.map((s, i) => (
                  <li
                    key={s}
                    className={`px-2 py-1.5 hover:cursor-default hover:bg-stone-100${
                      index === i ? " bg-stone-100" : ""
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
                    <span className="text-xl font-thin text-gray-500 scale-x-[-1] px-2">
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
          className="bg-stone-100 text-3xl text-stone-400 scale-x-[-1] border border-stone-400 px-5 rounded-l-full hover:bg-stone-200"
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
      <div className="flex col-span-2 space-x-7 -mr-24">
        <div className="rounded-icon">
          <img alt="start video" src={CREATE_VIDEO} className="" />
        </div>
        <div className="rounded-icon">
          <img alt="notification" src={NOTIFY_BELL} />
        </div>
        <img alt="profile" src={USER_LOGO} className="h-8 cursor-pointer" />
      </div>
      {showSuggestions && (
        <div
          className="absolute w-screen h-screen -z-10"
          onClick={() => setShowSuggestions(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;

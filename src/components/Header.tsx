import { Link, useNavigate } from "react-router-dom";
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
import getSearchSuggestions from "../utils/custom hooks/getSearchSuggestions";
import {
  addSuggestions,
  SearchSuggestionsState,
} from "../redux/autoCompleteSearchSuggestionsSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchState: SearchSuggestionsState = useAppSelector(
    (store) => store.searchSuggestions
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data, status, error } = useQuery({
    queryKey: [text],
    queryFn: () => getSearchSuggestions(searchRef.current?.value || ""),
    enabled: searchState[text] === undefined,
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
        <Link to="/">
          <img alt="logo" src={YOUTUBE_LOGO} className="h-6 mt-2" />
        </Link>
      </div>
      <div className="flex col-span-8 place-content-center mr-32 h-[41px]">
        <div className="flex flex-col w-[70%]">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search"
            className="pl-5 border py-2 border-stone-400 rounded-l-full"
            onChange={() => {
              setText(searchRef.current?.value || "");
              dispatch(addSuggestions(data));
            }}
            onKeyDown={() => {}}
            onClick={() => {}}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          {showSuggestions && (
            <ul
              className={
                "bg-white py-1.5 font-semibold shadow-2xl rounded-xl border-stone-200 duration-500"
              }
            >
              {list?.map((s) => (
                <li
                  key={s}
                  className="px-2 py-1.5  hover:cursor-default hover:bg-stone-100"
                  onClick={() => {
                    setShowSuggestions(false);
                    navigate("/results?search_query=" + s.replace(/ /g, "+"));
                  }}
                >
                  <span className="text-xl font-thin text-gray-500 scale-x-[-1] px-2">
                    ⌕‍{" "}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="bg-stone-100 text-3xl text-stone-400 scale-x-[-1] border border-stone-400 px-5 rounded-l-full hover:bg-stone-200"
          onClick={() => {}}
        >
          ⌕‍
        </button>
      </div>
      <div className="flex col-span-2 space-x-7 -mr-24">
        <div className="rounded-icon">
          <img alt="start video" src={CREATE_VIDEO} className="mt-1" />
        </div>
        <div className="rounded-icon">
          <img alt="notification" src={NOTIFY_BELL} />
        </div>
        <img alt="profile" src={USER_LOGO} className="h-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;

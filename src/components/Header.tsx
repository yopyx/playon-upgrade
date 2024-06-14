import { Link } from "react-router-dom";
import {
  CREATE_VIDEO,
  HAMBURGER_ICON,
  NOTIFY_BELL,
  USER_LOGO,
  YOUTUBE_LOGO,
} from "../utils/constants";

const Header = () => {
  return (
    <div className="w-screen grid grid-flow-col p-3 m-2 mt-0 shadow-xl bg-white fixed z-30">
      <div className="flex space-x-6 col-span-2">
        <div
          className="hover:bg-stone-300 rounded-full p-2 mb-2 ml-4 cursor-pointer"
          onClick={() => {}}
        >
          <img alt="menu icon" src={HAMBURGER_ICON} className="h-5" />
        </div>
        <Link to="/">
          <img
            alt="logo"
            src={YOUTUBE_LOGO}
            className="h-6 mt-2 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex col-span-8 place-content-center mr-32 h-[41px]">
        <div className="flex flex-col w-[70%]">
          <input
            type="text"
            value={""}
            placeholder="Search"
            className="pl-5 border py-2 border-stone-400 rounded-l-full"
            onChange={() => {}}
            onKeyDown={() => {}}
            onClick={() => {}}
          />
        </div>
        <button
          className="bg-stone-100 text-3xl text-stone-400 scale-x-[-1] border border-stone-400 px-5 rounded-l-full hover:bg-stone-200"
          onClick={() => {}}
        >
          ⌕‍
        </button>
      </div>
      <div className="flex col-span-2 space-x-5 -mr-24 -m-1">
        <div className="px-3 py-4 mb-1 hover:bg-stone-300 rounded-full cursor-pointer">
          <img alt="start video" src={CREATE_VIDEO} className="h-3.5" />
        </div>
        <div className="p-3 mb-2 hover:bg-stone-300 rounded-full cursor-pointer">
          <img alt="notification" src={NOTIFY_BELL} className="h-5" />
        </div>
        <img
          alt="profile"
          src={USER_LOGO}
          className="h-8 mt-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;

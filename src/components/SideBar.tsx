import {
  FEEDBACK_ICON,
  GAMING_ICON,
  HELP_ICON,
  HISTORY_ICON,
  HOME_ICON,
  LIVE_ICON,
  MUSIC_ICON,
  REPORT_ICON,
  SETTINGS_ICON,
  SHORTS_ICON,
  SPORT_ICON,
  SUBSCRIBE_ICON,
  TRENDING,
  WATCH_LATER,
  YOUR_CHANNEL,
  YOUR_CLIPS,
  YOUR_VIDEO,
  YT_CIRCLE_ICON,
  YT_ICON,
  YT_KIDS_ICON,
  YT_POLY_ICON,
} from "../utils/constants";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import { closeSidebarMenu } from "../redux/ui_slices/sideBarResponsiveSlice";
import { useAppDispatch, useAppSelector } from "../typed hooks/reduxHooks";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  const { pathname } = useLocation();
  return (
    <>
      {sidebarCollapsed && pathname !== "/watch" ? (
        <div className="w-20 h-72 sticky top-24 shadow-lg text-xs p-3 m-3 space-y-5">
          <ul className="flex flex-col">
            <li className="flex flex-wrap rounded-lg cursor-pointer h-16 p-3 mx-auto mr-0 hover:bg-stone-100">
              <img alt="home" src={HOME_ICON} className="h-5 mx-auto mr-1.5" />
              <p className="inline-block mx-auto mr-0">Home</p>
            </li>
            <li className="flex flex-wrap rounded-lg cursor-pointer h-16 p-3 mx-auto mr-0 hover:bg-stone-100">
              <img
                alt="Shorts"
                src={SHORTS_ICON}
                className="h-7 mx-auto mr-1.5"
              />
              <p className="inline-block mx-auto mr-0">Shorts</p>
            </li>
            <li className="flex flex-wrap rounded-lg cursor-pointer h-16 p-3 mx-auto mr-0 hover:bg-stone-100">
              <img
                alt="Subs"
                src={SUBSCRIBE_ICON}
                className="h-6 opacity-60 mx-auto mr-1.5"
              />
              <p className="inline-block mx-auto mr-1">Subs</p>
            </li>
            <li className="flex flex-wrap rounded-lg cursor-pointer h-16 p-3 mx-auto mr-0 hover:bg-stone-100">
              <img
                alt="You"
                src={YOUR_VIDEO}
                className="h-6 opacity-60 mx-auto mr-1.5"
              />
              <p className="inline-block mx-auto mr-2">You</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex">
          <div
            className={`${
              pathname === "/watch"
                ? "fixed z-20 h-[640px] duration-500 ease-in-out" +
                  (sidebarCollapsed ? " -translate-x-60" : "")
                : "col-span-1 sticky top-24 h-[610px]"
            } w-56 bg-white overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-200 hover:scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-lg shadow-lg text-sm p-3 m-2 mt-3 space-y-5`}
          >
            <ul className="flex flex-col">
              <Link to={"/"}>
                <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                  <img alt="home" src={HOME_ICON} className="h-5" />
                  <p>Home</p>
                </li>
              </Link>
              <li className="flex space-x-7 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Shorts" src={SHORTS_ICON} className="h-7 -ml-1" />
                <p>Shorts</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Subscriptions" src={SUBSCRIBE_ICON} className="h-5" />
                <p>Subscriptions</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="flex flex-col">
              <li className="font-semibold text-[16px] rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                {"You >"}
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={YOUR_CHANNEL} className="h-6 -ml-1" />
                <p>Your channel</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={HISTORY_ICON} className="h-5" />
                <p>History</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={YOUR_VIDEO} className="h-5" />
                <p>Your videos</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={WATCH_LATER} className="h-5" />
                <p>Watch Later</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={YOUR_CLIPS} className="h-5" />
                <p>Your clips</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="flex flex-col">
              <li className="font-semibold text-[16px] mb-3">Subscriptions</li>
              <li className="">No subscriptions yet</li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="flex flex-col">
              <li className="font-semibold text-[16px] mb-3">Explore</li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={TRENDING} className="h-5" />
                <p>Trending</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={MUSIC_ICON} className="h-5" />
                <p>Music</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={LIVE_ICON} className="h-4" />
                <p>Live</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={GAMING_ICON} className="h-4" />
                <p>Gaming</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="home" src={SPORT_ICON} className="h-6" />
                <p>Sport</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="flex flex-col">
              <li className="font-semibold text-[16px] mb-3">
                More from YouTube
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="YouTube Premium" src={YT_ICON} className="h-4" />
                <p>YouTube Premium</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="YouTube Studio" src={YT_POLY_ICON} className="h-7" />
                <p>YouTube Studio</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img
                  alt="YouTube Music"
                  src={YT_CIRCLE_ICON}
                  className="h-9 -mt-2 -ml-1.5"
                />
                <p className="">YouTube Music</p>
              </li>
              <li className="flex space-x-8 ml-1 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="YouTube Kids" src={YT_KIDS_ICON} className="h-5" />
                <p>YouTube Kids</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="flex flex-col">
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Settings" src={SETTINGS_ICON} className="h-5" />
                <p>Settings</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Report history" src={REPORT_ICON} className="h-5" />
                <p>Report history</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Help" src={HELP_ICON} className="h-5" />
                <p>Help</p>
              </li>
              <li className="flex space-x-8 rounded-lg cursor-pointer h-10 p-2 hover:bg-stone-100">
                <img alt="Send feedback" src={FEEDBACK_ICON} className="h-5" />
                <p>Send feedback</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <Footer />
          </div>
          {pathname === "/watch" && !sidebarCollapsed && (
            <div
              className="fixed w-screen h-screen bg-black opacity-35"
              onClick={() => dispatch(closeSidebarMenu())}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;

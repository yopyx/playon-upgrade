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
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { collapseSidebar } = useAppSelector(
    (store) => store.responsiveSideBar
  );
  const { pathname } = useLocation();
  return (
    <>
      {collapseSidebar && pathname !== "/watch" ? (
        <div className="w-20 h-72 sticky top-24 shadow-lg text-xs p-3 m-3 gap-y-5">
          <ul className="container-ver">
            <Link to={"/"}>
              <li className="collapsed-sidebar-nav-btn">
                <img alt="home" src={HOME_ICON} />
                <p>Home</p>
              </li>
            </Link>
            <li className="collapsed-sidebar-nav-btn">
              <img alt="Shorts" src={SHORTS_ICON} />
              <p>Shorts</p>
            </li>
            <li className="collapsed-sidebar-nav-btn">
              <img alt="Subs" src={SUBSCRIBE_ICON} />
              <p>Subs</p>
            </li>
            <li className="collapsed-sidebar-nav-btn">
              <img alt="You" src={YOUR_VIDEO} />
              <p>You</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex">
          <div
            className={`${
              pathname === "/watch"
                ? "fixed top-12 z-20 h-[640px] duration-500 ease-in-out" +
                  (collapseSidebar ? " -translate-x-60" : "")
                : "sticky top-24 h-[610px]"
            } w-56 bg-white overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-200 hover:scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-lg shadow-lg text-sm p-3 m-2 mt-3 space-y-5`}
          >
            <ul className="container-ver">
              <Link to={"/"}>
                <li className="sidebar-nav-btn">
                  <img alt="home" src={HOME_ICON} />
                  <p>Home</p>
                </li>
              </Link>
              <li className="sidebar-nav-btn">
                <img alt="Shorts" src={SHORTS_ICON} />
                <p>Shorts</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="Subscriptions" src={SUBSCRIBE_ICON} />
                <p>Subscriptions</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="container-ver">
              <li className="sidebar-nav-btn font-semibold">{"You >"}</li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={YOUR_CHANNEL} />
                <p>Your channel</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={HISTORY_ICON} />
                <p>History</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={YOUR_VIDEO} />
                <p>Your videos</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={WATCH_LATER} />
                <p>Watch Later</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={YOUR_CLIPS} />
                <p>Your clips</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="container-ver">
              <li className="font-semibold text-[16px] mb-3">Subscriptions</li>
              <li className="">No subscriptions yet</li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="container-ver">
              <li className="font-semibold text-[16px] mb-3">Explore</li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={TRENDING} />
                <p>Trending</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={MUSIC_ICON} />
                <p>Music</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={LIVE_ICON} />
                <p>Live</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={GAMING_ICON} />
                <p>Gaming</p>
              </li>
              <li className="sidebar-nav-btn">
                <img alt="home" src={SPORT_ICON} />
                <p>Sport</p>
              </li>
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="container-ver">
              <li className="font-semibold text-[16px] mb-3">
                More from YouTube
              </li>
              {[
                ["YouTube Prem..", YT_ICON],
                ["YouTube Studio", YT_POLY_ICON],
                ["YouTube Music", YT_CIRCLE_ICON],
                ["YouTube Kids", YT_KIDS_ICON],
              ].map((e) => (
                <li className="sidebar-nav-btn" key={e[0]}>
                  <img alt="YouTube Premium" src={e[1]} />
                  <p>{e[0]}</p>
                </li>
              ))}
              <li className="border-b-2 pb-6"></li>
            </ul>
            <ul className="container-ver">
              {[
                ["Settings", SETTINGS_ICON],
                ["Report history", REPORT_ICON],
                ["Help", HELP_ICON],
                ["Send feedback", FEEDBACK_ICON],
              ].map((e) => (
                <li className="sidebar-nav-btn" key={e[0]}>
                  <img alt="Settings" src={e[1]} />
                  <p>{e[0]}</p>
                </li>
              ))}
              <li className="border-b-2 pb-6"></li>
            </ul>
            <Footer />
          </div>
          {pathname === "/watch" && !collapseSidebar && (
            <div
              className="fixed w-screen h-screen bg-black opacity-35 z-[15]"
              onClick={() => dispatch(openCloseSidebar(true))}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;

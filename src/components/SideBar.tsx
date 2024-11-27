import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import { SideBarProps } from "../types/props";

const Sidebar = ({ lightTheme }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const { collapseSidebar } = useAppSelector(
    (store) => store.responsiveSideBar
  );
  const { pathname } = useLocation();

  return (
    <>
      {collapseSidebar && pathname !== "/watch" ? (
        <div
          className={`w-20 h-72 sticky top-24 shadow-md shadow-yellow-600 text-xs p-3 m-3 gap-y-5 mobile:hidden${
            pathname === "/results" ? " tablet-r:hidden" : ""
          } tablet:hidden laptop-l:hidden 8k:text-base ${
            lightTheme
              ? "text-black bg-stone-200"
              : "text-stone-200 dark-highlight-color"
          }`}
        >
          <ul className="container-ver">
            <Link to={"/"}>
              <li className="collapsed-sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/home-225.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Home</p>
              </li>
            </Link>
            <li className="collapsed-sidebar-nav-btn 8k:-ml-0.5">
              <img
                alt="Shorts"
                src={"/shorts.png"}
                className={`${
                  lightTheme ? "mix-blend-multiply" : "invert mix-blend-screen"
                }`}
              />
              <p>Shorts</p>
            </li>
            <li className="collapsed-sidebar-nav-btn 8k:-ml-0.5">
              <img
                alt="Subs"
                src={"/subs.png"}
                className={`${lightTheme ? "" : "invert"}`}
              />
              <p>Subs</p>
            </li>
            <li className="collapsed-sidebar-nav-btn 8k:-ml-0.5">
              <img
                alt="You"
                src={"/yourChannel.png"}
                className={`${lightTheme ? "" : "invert"}`}
              />
              <p>You</p>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={`flex mobile:absolute laptop-l:sidebar-laptop-l tablet:sidebar-tablet tablet-s:sidebar-tablet-s mobile:sidebar-mobile`}
        >
          <div
            className={`${
              pathname === "/watch"
                ? "fixed top-12 z-20 h-[640px] duration-500 ease-in-out" +
                  (collapseSidebar ? " -translate-x-60" : "")
                : "sticky top-24 h-[610px]"
            } ${
              lightTheme
                ? "text-black bg-stone-200"
                : "text-stone-200 dark-highlight-color"
            } w-56 overflow-y-scroll shadow-md shadow-yellow-600 scrollbar-thin scrollbar-thumb-zinc-200 hover:scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-lg text-sm p-3 m-2 mt-3 space-y-5 8k:text-lg`}
          >
            <ul className="container-ver">
              <Link to={"/"}>
                <li className="sidebar-nav-btn">
                  <img
                    alt="home"
                    src={"/home-225.png"}
                    className={`${lightTheme ? "" : "invert"}`}
                  />
                  <p>Home</p>
                </li>
              </Link>
              <li className="sidebar-nav-btn">
                <img
                  alt="Shorts"
                  src={"/shorts.png"}
                  className={`${
                    lightTheme
                      ? "mix-blend-multiply"
                      : "invert mix-blend-screen"
                  }`}
                />
                <p>Shorts</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="Subscriptions"
                  src={"/subs.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Subscriptions</p>
              </li>
              <li className="border-b-2 pb-6 border-yellow-600/75"></li>
            </ul>
            <ul className="container-ver">
              <li className="sidebar-nav-btn font-semibold">{"You >"}</li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/yourChannel.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Your channel</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/history.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>History</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/yourVideo.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Your videos</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/watchLater.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Watch Later</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/clips.svg"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Your clips</p>
              </li>
              <li className="border-b-2 pb-6 border-yellow-600/75"></li>
            </ul>
            <ul className="container-ver">
              <li className="font-semibold text-[16px] mb-3">Subscriptions</li>
              <li className="">No subscriptions yet</li>
              <li className="border-b-2 pb-6 border-yellow-600/75"></li>
            </ul>
            <ul className="container-ver">
              <li className="font-semibold text-[16px] mb-3">Explore</li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/fire.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Trending</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/music.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Music</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/live.png"}
                  className={`${lightTheme ? "" : "invert"}`}
                />
                <p>Live</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={"/gaming.png"}
                  className={`${
                    lightTheme
                      ? "mix-blend-multiply"
                      : "invert mix-blend-screen"
                  }`}
                />
                <p>Gaming</p>
              </li>
              <li className="sidebar-nav-btn">
                <img
                  alt="home"
                  src={
                    "/trophy-icon-design-template-in-white-background-free-vector.png"
                  }
                  className={`${
                    lightTheme
                      ? "mix-blend-multiply"
                      : "invert mix-blend-screen"
                  }`}
                />
                <p>Sport</p>
              </li>
              <li className="border-b-2 pb-6 border-yellow-600/75"></li>
            </ul>

            <ul className="container-ver">
              {[
                ["Settings", "/settings.png"],
                ["Report history", "/report.png"],
                ["Help", "/question.png"],
                ["Send feedback", "/feedback.png"],
              ].map((e) => (
                <li className="sidebar-nav-btn" key={e[0]}>
                  <img
                    alt="Settings"
                    src={e[1]}
                    className={`${
                      lightTheme
                        ? "mix-blend-multiply"
                        : "invert mix-blend-screen"
                    }`}
                  />
                  <p>{e[0]}</p>
                </li>
              ))}
              <li className="border-b-2 pb-6 border-yellow-600/75"></li>
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

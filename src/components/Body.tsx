import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import ScrollToTop from "./ScrollToTop";
import { useAppSelector } from "../types/reduxHooks";
import { UiProps } from "../types/props";
import LandingPage from "./LandingPage";

const Body = () => {
  const path = useLocation().pathname;
  const { light } = useAppSelector((store) => store.theme);
  const sidebarState = useAppSelector((store) => store.responsiveSideBar);
  const uiStates = { lightTheme: light, sidebarState } as UiProps;

  return (
    <div
      className={`flex flex-col mobile:body-mobile tablet-s:body-tablet-s tablet:body-tablet laptop-l:body-laptop-l 4k-3:body-4k-3 4k-2:body-4k-2 4k:body-4k 8k-3:body-8k-3 8k-2:body-8k-2 8k:body-8k ${
        light ? "light-theme" : "dark-theme"
      }`}
    >
      <ScrollToTop />
      {path == "/signin" ? (
        <LandingPage />
      ) : (
        <>
          <div>
            <Header lightTheme={light} />
          </div>
          <div className="flex">
            <SideBar uiStates={uiStates} />
            <Outlet context={uiStates} />
          </div>
        </>
      )}
    </div>
  );
};

export default Body;

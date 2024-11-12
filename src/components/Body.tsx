import { Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import ScrollToTop from "./ScrollToTop";
import useQuota from "../utils/custom hooks/useQuota";
import { useAppSelector } from "../types/reduxHooks";

const Body = () => {
  const { light } = useAppSelector((store) => store.theme);
  const apiKey = useQuota();
  return (
    <div
      className={`flex flex-col mobile:body-mobile tablet-s:body-tablet-s tablet:body-tablet laptop-l:body-laptop-l 4k-3:body-4k-3 4k-2:body-4k-2 4k:body-4k 8k-3:body-8k-3 8k-2:body-8k-2 8k:body-8k ${
        light ? "light-theme" : "dark-theme"
      }`}
    >
      <ScrollToTop />
      <div>
        <Header lightTheme={light} />
      </div>
      <div className="flex">
        <SideBar lightTheme={light} />
        <Outlet context={apiKey} />
      </div>
    </div>
  );
};
export function useKey() {
  return useOutletContext<string>();
}
export default Body;

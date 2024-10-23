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
      className={`flex flex-col ${light ? "bg-[#d5c8bd]" : "bg-[#2a2928]/55"}`}
    >
      <ScrollToTop />
      <Header />
      <div className="flex gap-x-5">
        <SideBar />
        <Outlet context={apiKey} />
      </div>
    </div>
  );
};
export function useKey() {
  return useOutletContext<string>();
}
export default Body;

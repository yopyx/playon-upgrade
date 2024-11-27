import { useLocation } from "react-router-dom";
import { useAppSelector } from "../types/reduxHooks";
import SuggestionsButtons from "./SuggestionsButtons";
import VideosResultsContainer from "./VideosResultsContainer";

const SearchResultsContainer = () => {
  const { pathname } = useLocation();
  const collapsedSideBar = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  return (
    <div
      className={`flex flex-col gap-y-16 ${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      }${
        pathname === "/watch"
          ? ""
          : " 8k-r:results-container-8k-r 4k-3:results-container-4k-3 laptop-r:results-container-laptop-r tablet-r:results-container-tablet-r mobile:results-container-mobile"
      }`}
    >
      <SuggestionsButtons collapsedSideBar={collapsedSideBar} />
      <VideosResultsContainer collapsedSideBar={collapsedSideBar} />
    </div>
  );
};

export default SearchResultsContainer;

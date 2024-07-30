import { useAppSelector } from "../types/reduxHooks";
import SuggestionsButtons from "./SuggestionsButtons";
import VideosResultsContainer from "./VideosResultsContainer";

const SearchResultsContainer = () => {
  const collapsedSideBar = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  return (
    <div className={`container-ver gap-y-16`}>
      <SuggestionsButtons collapsedSideBar={collapsedSideBar} />
      <VideosResultsContainer collapsedSideBar={collapsedSideBar} />
    </div>
  );
};

export default SearchResultsContainer;

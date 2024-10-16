import { useAppSelector } from "../types/reduxHooks";
import PopularVideosContainer from "./PopularVideosContainer";
import SuggestionsButtons from "./SuggestionsButtons";

const MainContainer = () => {
  const collapsedSideBar = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  return (
    <div className={`container-ver gap-y-16`}>
      <SuggestionsButtons collapsedSideBar={collapsedSideBar} />
      <PopularVideosContainer collapsedSideBar={collapsedSideBar} />
    </div>
  );
};

export default MainContainer;

import { useAppSelector } from "../types/reduxHooks";
import PopularVideosContainer from "./PopularVideosContainer";
import SuggestionsButtons from "./SuggestionsButtons";

const MainContainer = () => {
  const collapsedSideBar = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  return (
    <div
      className={`flex flex-col gap-y-16 ${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } mobile:main-page-mobile tablet-s:main-page-tablet-s tablet:main-page-tablet laptop-l:main-page-laptop-l 4k-3:main-page-4k-3 4k-2:main-page-4k-2 4k:main-page-4k 8k-3:main-page-8k-3 8k-2:main-page-8k-2 8k:main-page-8k`}
    >
      <SuggestionsButtons collapsedSideBar={collapsedSideBar} />
      <PopularVideosContainer collapsedSideBar={collapsedSideBar} />
    </div>
  );
};

export default MainContainer;

import { useAppSelector } from "../types/reduxHooks";
import PopularVideosContainer from "./PopularVideosContainer";
import SuggestionsButtons from "./SuggestionsButtons";

const MainContainer = () => {
  const collapsedSideBar = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  return (
    <div
      className={`w-[${
        collapsedSideBar ? "90vw" : "80vw"
      }] container-ver gap-y-16`}
    >
      <SuggestionsButtons />
      <PopularVideosContainer />
    </div>
  );
};

export default MainContainer;

import PopularVideosContainer from "./PopularVideosContainer";
import SuggestionsButtons from "./SuggestionsButtons";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import { useAppDispatch } from "../types/reduxHooks";
import { useEffect } from "react";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import {
  addCategoryDetails,
  addSelectedCategory,
} from "../redux/videoCategorySlice";
import { useLocation } from "react-router-dom";

const MainContainer = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { sidebarState } = useUpdatedUi();
  useEffect(() => {
    return () => {
      dispatch(openCloseSidebar(["mainContainerPage", false]));
      pathname === "/"
        ? dispatch(addCategoryDetails({ id: "0", title: "All" }))
        : dispatch(addSelectedCategory("All"));
    };
  }, [pathname]);
  return (
    <div
      className={`flex flex-col gap-y-16 ${
        sidebarState.mainContainerPage.collapseSidebar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      } mobile:main-page-mobile tablet-s:main-page-tablet-s tablet:main-page-tablet laptop-l:main-page-laptop-l 4k-3:main-page-4k-3 4k-2:main-page-4k-2 4k:main-page-4k 8k-3:main-page-8k-3 8k-2:main-page-8k-2 8k:main-page-8k`}
    >
      <SuggestionsButtons />
      <PopularVideosContainer />
    </div>
  );
};

export default MainContainer;

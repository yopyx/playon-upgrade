import { useQuery } from "@tanstack/react-query";
import getHistoryAsync from "../utils/functions/getHistoryAsync";
import { Link, useNavigate } from "react-router-dom";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import { useAppDispatch } from "../types/reduxHooks";
import { useEffect, useMemo } from "react";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import DetailedVideoCardsShimmer from "./shimmer/DetailedVideoCardsShimmer";
import DetailedVideoCard from "./DetailedVideoCard";
import { addSearchTag } from "../redux/searchTextSlice";
import { addSelectedCategory } from "../redux/videoCategorySlice";

const History = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { lightTheme, sidebarState } = useUpdatedUi();
  //const { pathname } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ["watching history"],
    queryFn: () => getHistoryAsync(),
  });
  const list = useMemo(() => {
    return data?.history;
  }, [data?.history]);
  useEffect(() => {
    return () => {
      dispatch(openCloseSidebar(["historyPage", false]));
    };
  }, [dispatch]);
  if (data?.status === 401) {
    navigate("/signin");
  }
  if (isLoading) {
    return <DetailedVideoCardsShimmer len={6} />;
  }
  return (
    <div
      className={`mt-20 flex flex-col gap-y-14 ${list && Object.keys(list).length > 2 ? "h-fit " : "h-screen "}${
        sidebarState.resultsPage.collapseSidebar
          ? "dynamic-width"
          : "dynamic-width-collapsed"
      }${" 8k-r:results-container-8k-r 4k-3:results-container-4k-3 laptop-r:results-container-laptop-r tablet-r:results-container-tablet-r mobile:results-container-mobile"}`}
    >
      <h2 className="font-extrabold text-3xl text-white w-min text-nowrap shadow-md shadow-yellow-500">
        Watch History
      </h2>
      {!list || Object.keys(list).length === 0 ? (
        <h4
          className={`mt-20 text-center font-semibold ${lightTheme ? "" : "text-white"}`}
        >
          No watch history yet.
        </h4>
      ) : (
        Object.keys(list!).map((date: string) => (
          <div key={date} className="flex flex-col gap-y-4">
            <h3 className="font-bold text-xl text-yellow-700 border-b-2 border-yellow-700 p-1 w-min text-nowrap">
              {new Date(date).toDateString().slice(4)}
            </h3>
            {list![date].map((v, i) => (
              <Link
                to={"/watch?v=" + v.videoId}
                //ref={lastElementRef}
                key={v.etag + i}
                onClick={() => {
                  v.tags.length &&
                    v.tags[0].trim() &&
                    dispatch(addSearchTag(v.tags[0]));
                  dispatch(addSelectedCategory("All"));
                }}
              >
                <DetailedVideoCard
                  info={v}
                  lightTheme={lightTheme}
                  isPriority={i < 4}
                />
              </Link>
            ))}{" "}
          </div>
        ))
      )}
    </div>
  );
};
export default History;

import { Link, useLocation } from "react-router-dom";
import DetailedVideoCard from "./DetailedVideoCard";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { addVideo } from "../redux/videosDataSlice";
import { addChannel } from "../redux/channelsDataSlice";

const VideosResultsContainer = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((store) => store.searchText.search);
  return (
    <div
      className={`${
        collapsedSideBar ? "dynamic-width" : "dynamic-width-collapsed"
      } flex flex-wrap space-x-4 space-y-10`}
    >
      <div
        className={
          (pathname === "/watch" ? "w-[400px]" : "w-[1320px]") +
          " flex justify-center"
        }
      >
        <div
          className={
            (pathname === "/watch" ? "w-[450px]" : "w-[1000px]") +
            " flex flex-col space-y-4 my-4"
          }
        >
          {[]?.map((v) => (
            <Link
              to={"/watch?v=" + v?.id}
              key={v.etag}
              onClick={() => {
                dispatch(addVideo(v));
                dispatch(
                  addChannel([]?.find?.((c) => v?.snippet?.channelId === c?.id))
                );
              }}
            >
              <DetailedVideoCard
                info={v}
                channelData={channelsData?.find(
                  (c) => v.snippet.channelId === c.id
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosResultsContainer;

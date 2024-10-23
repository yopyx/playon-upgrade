import { VideoCardProps } from "../types/props";
import { useAppSelector } from "../types/reduxHooks";
import { LIVE_ICON, handleViewsCount, timeDiff } from "../utils/constants";

const VideoCard = ({ info, imgUrl }: VideoCardProps) => {
  const sidebarCollapsed = useAppSelector(
    (store) => store.responsiveSideBar.collapseSidebar
  );
  const { channelTitle, title, publishedAt, thumbnails } = info!.snippet;
  const { viewCount } = info!.statistics;
  const duration =
    info?.contentDetails?.duration === "P0D"
      ? ""
      : info?.contentDetails?.duration
          ?.slice(2, -1)
          ?.split(/[HMS]/g)
          .map((e) => e.padStart(2, "0"))
          .join(":");
  const concurrentViewers = info?.liveStreamingDetails?.concurrentViewers;
  if (!info) return;
  return (
    <div className="">
      <div
        className={`${
          sidebarCollapsed ? "w-[330px] h-[200px]" : "w-[394px] h-[222px]"
        }`}
      >
        <img
          alt={title}
          src={thumbnails?.maxres?.url || thumbnails?.high?.url}
          className={`${
            sidebarCollapsed ? "w-[330px] h-[200px]" : "w-[394px] h-[222px]"
          } object-cover rounded-xl hover:rounded-none border-2 border-yellow-600/75`}
        />
        {duration && (
          <div className="bg-black text-white text-xs font-semibold rounded-md w-max px-1 py-0.5 -mt-6 mx-auto mr-1 relative">
            {(duration?.length === 2 ? "00:" : "") + duration}
          </div>
        )}
      </div>
      <div className="flex mt-3 space-x-3">
        {imgUrl ? (
          <img
            alt={title}
            src={imgUrl}
            className="rounded-full h-10 w-10"
          ></img>
        ) : (
          <div className="rounded-full w-10 h-10 bg-black"></div>
        )}
        <div className="flex-col space-y-1">
          <h4 className="font-semibold w-[280px]">{title}</h4>
          <h5 className="text-xs">{channelTitle}</h5>
          {concurrentViewers ? (
            <>
              <h5 className="text-xs">
                {handleViewsCount(concurrentViewers) + " watching"}
              </h5>
              <div className="flex space-x-2 bg-red-600 text-white text-xs font-semibold rounded-md w-max px-1 py-0.5">
                <img
                  alt="home"
                  src={LIVE_ICON}
                  className="h-3 mt-0.5 bg-slate-300 mix-blend-plus-lighter rounded-sm"
                />
                <span>LIVE</span>
              </div>
            </>
          ) : (
            <h5 className="text-xs">
              {handleViewsCount(viewCount) +
                " Views • " +
                timeDiff(
                  new Date().getTime() - new Date(publishedAt).getTime()
                )}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

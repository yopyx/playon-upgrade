import { useLocation } from "react-router-dom";
import { handleViewsCount, LIVE_ICON, timeDiff } from "../utils/constants";
import { DetailedVideoCardProps } from "../types/props";

const DetailedVideoCard = ({ info, channelData }: DetailedVideoCardProps) => {
  const { publishedAt, title, description, thumbnails, channelTitle } =
    info!.snippet;
  const { viewCount } = info.statistics;
  const profileUrl = channelData?.snippet?.thumbnails?.default?.url;
  const { pathname } = useLocation();
  const duration =
    info.contentDetails.duration === "P0D"
      ? ""
      : (info.contentDetails.duration || "")
          .slice(2, -1)
          .replace("DT", "24H")
          .split(/[HMS]/g)
          .map((e) => e.padStart(2, "0"))
          .join(":");
  const concurrentViewers = info?.liveStreamingDetails?.concurrentViewers;
  return (
    <div
      className={
        (pathname === "/watch" ? "-gap-x-4" : "gap-x-4") + " flex mx-auto"
      }
    >
      <div
        className={
          pathname === "/watch" ? "h-[115px] w-[205px]" : "h-[210px] w-[375px]"
        }
      >
        <img
          src={thumbnails.high.url}
          alt={thumbnails.high.url}
          className={
            (pathname === "/watch"
              ? "h-[115px] w-[205px]"
              : "h-[210px] w-[375px]") +
            " object-cover duration-200 rounded-xl hover:rounded-none"
          }
        />
        {duration && info.snippet.liveBroadcastContent !== "live" && (
          <div className="bg-black text-white text-xs font-semibold rounded-md w-max h-max px-1 py-0.5 relative -mt-6 mx-auto mr-1">
            {(duration.length === 2 ? "00:" : "") + duration}
          </div>
        )}
      </div>
      <div
        className={
          (pathname === "/watch" ? "w-[250px] scale-[80%] -m-5" : "w-[650px]") +
          " flex flex-col gap-y-2.5"
        }
      >
        <h2 className="text-lg">
          {pathname === "/watch" ? title.slice(0, 45) + "..." : title}
        </h2>
        {info.snippet.liveBroadcastContent === "live" && concurrentViewers ? (
          <>
            <h5 className="text-slate-600 text-xs">
              {handleViewsCount(concurrentViewers) + " watching"}
            </h5>
            <div className="w-max flex gap-x-2 bg-red-600 text-white text-xs font-semibold rounded-md px-1 py-0.5">
              <img
                alt="live"
                src={LIVE_ICON}
                className="h-3 mt-0.5 bg-slate-300 mix-blend-plus-lighter rounded-sm"
              />
              <span>LIVE</span>
            </div>
          </>
        ) : (
          <h5 className="text-xs text-slate-600 relative -top-1.5">
            {handleViewsCount(viewCount) +
              " Views • " +
              timeDiff(new Date().getTime() - new Date(publishedAt).getTime())}
          </h5>
        )}
        <div className="flex gap-x-1">
          {pathname !== "/watch" ? (
            profileUrl ? (
              <img
                alt={title}
                src={profileUrl}
                className="rounded-full w-7 h-7"
              ></img>
            ) : (
              <div className="rounded-full w-7 h-7 bg-black"></div>
            )
          ) : (
            ""
          )}
          <h5 className="text-xs text-slate-600 my-auto">{channelTitle}</h5>
        </div>
        {pathname !== "/watch" && (
          <h5 className="text-xs text-slate-600">
            {description.slice(0, 300) + "..."}
          </h5>
        )}
      </div>
    </div>
  );
};

export default DetailedVideoCard;

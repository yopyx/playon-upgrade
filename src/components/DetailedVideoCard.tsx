import { useLocation } from "react-router-dom";
import { handleViewsCount, timeDiff } from "../utils/constants";
import { DetailedVideoCardProps } from "../types/props";

const DetailedVideoCard = ({
  info,
  channelData,
  lightTheme,
}: DetailedVideoCardProps) => {
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
        (pathname === "/watch" ? "-gap-x-4 w-full" : "gap-x-4") +
        " flex mx-auto mobile:flex-col tablet-w2:flex-col mobile-w:flex-col mobile:w-[320px]"
      }
    >
      <div
        className={
          pathname === "/watch"
            ? "h-[130px] w-[215px] 8k:results-card-watch-8k 8k-w:results-card-watch-8k-w 4k-w:results-card-watch-4k-w 4k-2:results-card-watch-4k-2 laptop-r:results-card-watch-laptop-r tablet-w:video-card-tablet-r tablet-r:video-card-tablet-r mobile:video-card-mobile"
            : "h-[210px] w-[375px] 8k-r:results-card-8k-r 4k-2:results-card-4k-2 tablet-r:video-card-tablet-r mobile:video-card-mobile"
        }
      >
        <img
          src={thumbnails.high.url}
          alt={thumbnails.high.url}
          className={
            (pathname === "/watch"
              ? "h-[130px] w-[215px] 8k:results-card-watch-8k 8k-w:results-card-watch-8k-w 4k-w:results-card-watch-4k-w 4k-2:results-card-watch-4k-2 laptop-r:results-card-watch-laptop-r tablet-w:video-card-tablet-r tablet-r:video-card-tablet-r mobile:video-card-mobile"
              : "h-[210px] w-[375px] 8k-r:results-card-8k-r 4k-2:results-card-4k-2 tablet-r:video-card-tablet-r mobile:video-card-mobile") +
            " object-cover duration-200 rounded-xl hover:rounded-none border-2 border-yellow-600/75"
          }
        />
        {duration && info.snippet.liveBroadcastContent !== "live" && (
          <div className="bg-black text-white text-xs font-semibold rounded-md w-max h-max px-1 py-0.5 relative -mt-6 mx-auto mr-1 8k-r:text-base 8k-r:-mt-8">
            {(duration.length === 2 ? "00:" : "") + duration}
          </div>
        )}
      </div>
      <div className="flex gap-x-1">
        <div className="hidden sub4:inline">
          {profileUrl ? (
            <img
              alt={title}
              src={profileUrl}
              className="rounded-full w-9 h-9"
            ></img>
          ) : (
            <div className="rounded-full w-9 h-9 bg-black"></div>
          )}
        </div>
        <div
          className={`
          ${
            pathname === "/watch"
              ? "w-[240px] h-[145px] 8k:video-info-watch-8k 8k-w:video-info-watch-8k-w 4k-w:video-info-watch-4k-w 4k-2:video-info-watch-4k-2 laptop-r:video-info-watch-laptop-r tablet-w:w-[415px] tablet-s:w-[420px] mobile:video-info-mobile"
              : "w-[650px] 8k-r:video-info-8k-r 4k-2:video-info-4k-2 4k-3:video-info-4k-3 laptop-r:video-info-laptop-r tablet-r:w-[420px] mobile:video-info-mobile"
          } flex flex-col gap-y-2.5 pl-2 tablet-w2:gap-y-3 mobile-w:gap-y-1 mobile:gap-y-1 ${
            lightTheme ? "text-stone-600" : "text-yellow-600"
          }`}
        >
          <h2
            className={`${
              pathname === "/watch"
                ? "text-sm 8k:text-xl 8k-w:text-lg 4k-w:text-lg sub3:text-lg mobile:w-[260px]"
                : "text-lg 8k-r:text-2xl 4k-2:text-xl 4k-2:text-wrap 4k-3:text-wrap tablet-r:text-sm mobile:text-xs"
            } ${lightTheme ? "text-black" : "text-slate-200"}`}
          >
            {pathname === "/watch" ? (
              <>
                <span className="sub3:hidden">
                  {title.slice(0, 30) + "..."}
                </span>
                <span className="hidden sub3:inline mobile:text-xs">
                  {title}
                </span>
              </>
            ) : (
              title
            )}
            {/* <span className="hidden tablet-w2:inline mobile-w:inline mobile:inline">
              ...
            </span> */}
          </h2>
          {info.snippet.liveBroadcastContent === "live" && concurrentViewers ? (
            <>
              <div className="flex gap-x-1">
                <h5 className="text-xs my-auto 8k-r:text-lg 4k-2:text-lg">
                  {channelTitle + " • "}
                </h5>
                <h5 className="text-xs 8k-r:text-sm">
                  {handleViewsCount(concurrentViewers) + " watching"}
                </h5>
              </div>
              <div className="w-max flex gap-x-2 bg-red-600 text-white text-xs font-semibold rounded-md px-1 py-0.5">
                <img
                  alt="live"
                  src={"/live.png"}
                  className="h-3 mt-0.5 bg-slate-300 mix-blend-plus-lighter rounded-sm"
                />
                <span>LIVE</span>
              </div>
            </>
          ) : (
            <div className="flex gap-x-1 text-xs relative -top-1.5 8k-r:text-base 4k-2:text-base flex-wrap">
              <h5 className="hidden text-xs text-nowrap my-auto 8k-r:text-lg 4k-2:text-lg tablet-w2:inline-block mobile-w:inline-block mobile:inline-block">
                {channelTitle + " • "}
              </h5>
              <h5 className="text-nowrap">
                {handleViewsCount(viewCount) + " Views • "}
              </h5>
              <h5 className="text-nowrap">
                {timeDiff(
                  new Date().getTime() - new Date(publishedAt).getTime()
                )}
              </h5>
            </div>
          )}
          <div className="flex gap-x-1 tablet-w2:hidden mobile-w:hidden mobile:hidden">
            {profileUrl ? (
              <img
                alt={title}
                src={profileUrl}
                className="rounded-full w-7 h-7 tablet-w2:card-channel-icon-mobile mobile-w:card-channel-icon-mobile mobile:card-channel-icon-mobile"
              ></img>
            ) : (
              <div className="rounded-full w-7 h-7 bg-black tablet-w2:card-channel-icon-mobile mobile-w:card-channel-icon-mobile mobile:card-channel-icon-mobile"></div>
            )}
            <h5 className="text-xs my-auto 8k-r:text-lg 4k-2:text-lg">
              {channelTitle}
            </h5>
          </div>
          {pathname !== "/watch" && (
            <h5 className="text-xs 8k-r:text-sm 4k-2:text-sm tablet-r:hidden tablet-w2:hidden mobile-w:hidden mobile:hidden">
              {description.slice(0, 300) + "..."}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedVideoCard;

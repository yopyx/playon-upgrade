import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { handleViewsCount, timeDiff } from "../utils/constants";
import { useAppDispatch } from "../types/reduxHooks";
import CommentsList from "./CommentsList";
import LiveChat from "./LiveChat";
import SearchResultsContainer from "./SearchResultsContainer";
import { addVideoTitle } from "../redux/searchTextSlice";
import NewComment from "./NewComment";
import getVideoByIdAsync from "../utils/functions/getVideoByIdAsync";
import { useQuery } from "@tanstack/react-query";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";
import { openCloseSidebar } from "../redux/ui_slices/sideBarResponsiveSlice";
import SpinShimmer from "./shimmer/SpinShimmer";
import { addSelectedCategory } from "../redux/videoCategorySlice";
import NotFound from "./errorCatcher/NotFound";

const WatchContainer = () => {
  const { lightTheme } = useUpdatedUi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const videoId = search.slice(3);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [expandView, setExpandView] = useState(false);

  const videoQuery = useQuery({
    queryKey: ["videoWatched", videoId],
    queryFn: () => getVideoByIdAsync(videoId),
  });
  const videoInfo = useMemo(() => {
    return videoQuery.data?.videoData;
  }, [videoQuery.data]);
  useEffect(() => {
    return () => {
      dispatch(addSelectedCategory("All"));
      dispatch(openCloseSidebar(["watchPage", true]));
    };
  }, []);
  useEffect(() => {
    if (videoQuery.data?.status === 401) {
      navigate("/signin");
    }
  }, [videoQuery.data?.status, navigate]);

  if (videoQuery.isLoading) {
    return <SpinShimmer />;
  }
  if (videoQuery.isError) {
    return <NotFound />;
  }
  if (!videoInfo) return null;
  dispatch(addVideoTitle(videoInfo.title));
  const {
    channelTitle,
    channelThumbnails,
    title,
    publishedAt,
    description,
    liveBroadcastContent,
    subscriberCount,
  } = videoInfo;
  const { viewCount, likeCount, commentCount } = videoInfo?.statistics || {};
  const profileUrl = channelThumbnails?.default?.url;
  return (
    <div className="flex justify-center gap-x-7 sub3:flex-col sub3:mx-auto sub3:w-[95%]">
      <div className="mt-20 ml-20 flex flex-col space-y-3 sub3:mx-auto sub3:w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-2xl mx-auto object-cover w-[950px] h-[535px] 8k:video-frame-8k 8k-w:video-frame-8k-w 4k-w:video-frame-4k-w 4k-2:video-frame-4k-2 sub3:w-full tablet-w:h-[55vh] tablet-r:h-[40vh] tablet-s:h-[32vh] mobile:h-[25vh]"
        ></iframe>
        <h2
          className={`font-bold text-lg w-[900px]${
            lightTheme ? "" : " text-white"
          } sub3:w-[90%] sub3:text-sm`}
        >
          {title}
        </h2>
        <div className="flex flex-wrap justify-between sub3:w-full">
          <div className="flex space-x-3">
            {profileUrl ? (
              <img
                alt={title}
                src={profileUrl}
                className="rounded-full h-10"
              ></img>
            ) : (
              <div className="rounded-full w-10 h-10 bg-black"></div>
            )}

            <div className="pr-5">
              <h4
                className={`font-semibold text-sm cursor-pointer${
                  lightTheme ? "" : " text-white"
                }`}
              >
                {channelTitle}
              </h4>
              <h5 className="text-yellow-700 text-xs">
                {+subscriberCount
                  ? `${handleViewsCount(subscriberCount)} subscribers`
                  : ""}
              </h5>
            </div>
            <button className="font-semibold text-sm text-white bg-black rounded-3xl px-4 h-9 hover:opacity-80 mobile:text-xs">
              Subscribe
            </button>
          </div>
          <div className="w-max flex space-x-1 mx-auto mr-0 mobile:overflow-x-scroll">
            <div
              className="flex bg-stone-200 rounded-s-full p-2 mobile:py-1.5 space-x-2 -mr-4 cursor-pointer hover:bg-stone-200"
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
            >
              {liked ? (
                <img
                  alt="share"
                  src={"/like (1).png"}
                  className="h-5 object-cover"
                />
              ) : (
                <img
                  alt="share"
                  src={"/like (2).png"}
                  className="h-5 object-cover"
                />
              )}
              <button className="font-semibold text-sm px-1 mobile:text-xs">
                {likeCount && (+likeCount + Number(liked)).toLocaleString()}
              </button>
            </div>
            <div
              className="flex bg-stone-200 rounded-e-full p-2 border-stone-200 border-l-2 cursor-pointer hover:bg-stone-200"
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
            >
              {disliked ? (
                <img
                  alt="share"
                  src={"/dislike.png"}
                  className="h-5 object-cover"
                />
              ) : (
                <img
                  alt="share"
                  src={"/dont-like.png"}
                  className="h-5 object-cover"
                />
              )}
            </div>
            <div className="flex bg-stone-200 rounded-3xl p-2 space-x-2 cursor-pointer hover:bg-stone-300">
              <img
                alt="share"
                src={"/share.png"}
                className="h-5 object-cover"
              />
              <button className="font-semibold text-sm mobile:hidden">
                Share
              </button>
            </div>
            <div className="flex bg-stone-200 rounded-3xl p-2 space-x-2 cursor-pointer hover:bg-stone-300">
              <img
                alt="share"
                src={"/downloads.png"}
                className="h-4 object-cover"
              />
              <button className="font-semibold text-sm mobile:hidden">
                Download
              </button>
            </div>
            <div className="flex bg-stone-200 rounded-full p-3 hover:bg-stone-300">
              <img alt="share" src={"/dots.png"} className="h-4 object-cover" />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col rounded-xl text-sm mobile:text-xs bg-stone-200 hover:bg-stone-300 p-4 space-y-2 cursor-pointer sub3:w-full"
          onClick={() => setExpandView(!expandView)}
        >
          <div className="flex space-x-3 font-semibold">
            <h3 className="">
              {(viewCount ? +viewCount : 0).toLocaleString() + " views"}
            </h3>
            <h3>
              {timeDiff(new Date().getTime() - new Date(publishedAt).getTime())}
            </h3>
          </div>
          <h3
            className={
              "w-[800px] sub3:w-full" +
              (expandView ? "" : " h-10 overflow-y-hidden")
            }
          >
            {description}
          </h3>
          <span className="font-semibold">
            {expandView ? "Show less" : "...more"}
          </span>
        </div>

        {liveBroadcastContent === "none" && Boolean(+commentCount) ? (
          <>
            <h3 className="text-xl font-bold text-yellow-700 sub5:text-sm">
              {(+commentCount).toLocaleString() + " Comments"}
            </h3>
            <div className="bg-white/35 p-1 rounded-lg sub3:w-full">
              <NewComment />

              <div className="sub3:h-72 sub3:overflow-y-scroll">
                <CommentsList vidId={videoId} isNested={false} />
              </div>
            </div>
          </>
        ) : (
          <p className="font-semibold mx-auto">Comments are turned off.</p>
        )}
      </div>
      <div className="flex flex-col -space-y-7">
        {liveBroadcastContent !== "none" && (
          <LiveChat videoId={videoId} lightTheme={lightTheme} />
        )}
        <SearchResultsContainer />
      </div>
    </div>
  );
};

export default WatchContainer;

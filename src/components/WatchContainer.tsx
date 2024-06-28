import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import getVideoData from "../utils/custom hooks/getVideoData";
import { useState } from "react";
import {
  BLACK_UNLIKE,
  BLUE_LIKE,
  DOTS_ICON,
  DOWNLOAD_ICON,
  LIKE_ICON,
  SHARE_ICON,
  UNLIKE_ICON,
  timeDiff,
} from "../utils/constants";

const WatchContainer = () => {
  const { search } = useLocation();
  const videoId = search.slice(3);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [expandView, setExpandView] = useState(false);
  const { data, status, error } = useQuery({
    queryKey: ["videoData", videoId],
    queryFn: () => getVideoData(videoId),
  });
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  const {
    channelTitle,
    title,
    publishedAt,
    description,
    liveBroadcastContent,
    tags,
  } = data.snippet;
  const { viewCount, likeCount, commentCount } = data.statistics;
  return (
    <div className="flex justify-center space-x-7">
      <div className="mt-20 ml-20 flex flex-col space-y-3">
        <iframe
          width="950"
          height="535"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-2xl"
        ></iframe>
        <h2 className="font-bold text-lg w-[900px]">{title}</h2>
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <div className="rounded-full w-10 h-10 bg-black"></div>

            <div className="pr-5">
              <h4 className="font-semibold text-sm cursor-pointer">
                {channelTitle}
              </h4>
              <h5 className="text-slate-600 text-xs">{"n" + " subscribers"}</h5>
            </div>
            <button className="font-semibold text-sm text-white bg-black rounded-3xl px-4 h-9 hover:opacity-80">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-2">
            <div
              className="flex bg-stone-100 rounded-s-full px-4 py-2.5 space-x-2 -mr-4 cursor-pointer hover:bg-stone-200"
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
            >
              {liked ? (
                <img alt="share" src={BLUE_LIKE} className="h-4" />
              ) : (
                <img alt="share" src={LIKE_ICON} className="h-4" />
              )}
              <button className="font-semibold text-sm">
                {likeCount && (+likeCount + Number(liked)).toLocaleString()}
              </button>
            </div>
            <div
              className="flex bg-stone-100 rounded-e-full px-4 py-2.5 border-stone-200 border-l-2 cursor-pointer hover:bg-stone-200"
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
            >
              {disliked ? (
                <img alt="share" src={BLACK_UNLIKE} className="h-4" />
              ) : (
                <img
                  alt="share"
                  src={UNLIKE_ICON}
                  className="h-4 scale-x-[-1]"
                />
              )}
            </div>
            <div className="flex bg-stone-100 rounded-3xl px-4 py-2.5 space-x-2 cursor-pointer hover:bg-stone-200">
              <img alt="share" src={SHARE_ICON} className="h-4" />
              <button className="font-semibold text-sm">Share</button>
            </div>
            <div className="flex bg-stone-100 rounded-3xl px-4 py-2.5 space-x-2 cursor-pointer hover:bg-stone-200">
              <img alt="share" src={DOWNLOAD_ICON} className="h-4" />
              <button className="font-semibold text-sm">Download</button>
            </div>
            <div className="flex bg-stone-100 rounded-full py-3 px-3 hover:bg-stone-200">
              <img alt="share" src={DOTS_ICON} className="h-1 mt-1.5" />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col rounded-xl text-sm bg-stone-100 hover:bg-stone-200 p-4 space-y-2 cursor-pointer"
          onClick={() => setExpandView(!expandView)}
        >
          <div className="flex space-x-3 font-semibold">
            <h3 className="">{(+viewCount).toLocaleString() + " views"}</h3>
            <h3>
              {timeDiff(new Date().getTime() - new Date(publishedAt).getTime())}
            </h3>
          </div>
          <h3
            className={
              "w-[800px]" + (expandView ? "" : " h-10 overflow-y-hidden")
            }
          >
            {description}
          </h3>
          <span className="font-semibold">
            {expandView ? "Show less" : "...more"}
          </span>
        </div>
        <h3 className="text-xl font-bold">
          {(+commentCount).toLocaleString() + " Comments"}
        </h3>
      </div>
    </div>
  );
};

export default WatchContainer;

import { useState } from "react";
import { CommentProps } from "../types/props";
import {
  BLACK_UNLIKE,
  BLUE_LIKE,
  LIKE_ICON,
  UNLIKE_ICON,
  timeDiff,
} from "../utils/constants";

const Comment = ({ info }: CommentProps) => {
  const [reply, setReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  if (!info) return;
  const {
    textOriginal,
    authorDisplayName,
    authorProfileImageUrl,
    authorChannelUrl,
    publishedAt,
    likeCount,
  } =
    info.snippet.totalReplyCount === undefined
      ? info!.snippet
      : info!.snippet.topLevelComment.snippet;
  return (
    <div className="flex space-x-3">
      {authorProfileImageUrl ? (
        <a href={authorChannelUrl}>
          <img
            alt={authorDisplayName}
            src={authorProfileImageUrl}
            className="rounded-full h-8 w-8 object-cover"
          ></img>
        </a>
      ) : (
        <div className="rounded-full w-8 h-8 bg-black"></div>
      )}
      <div className="flex flex-col space-y-1">
        <div className="flex text-xs space-x-1">
          <h5 className="font-semibold">
            <a href={authorChannelUrl}>{authorDisplayName}</a>
          </h5>
          <h5 className="text-slate-600">
            {timeDiff(new Date().getTime() - new Date(publishedAt).getTime())}
          </h5>
        </div>
        <h4 className="text-sm w-[750px]">{textOriginal}</h4>
        <div className="flex text-xs space-x-2">
          <button
            className="rounded-full p-2 hover:bg-stone-200"
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
          </button>
          <h5 className="text-slate-600 py-2">{likeCount + Number(liked)}</h5>
          <button
            className="rounded-full p-2 hover:bg-stone-200"
            onClick={() => {
              setDisliked(!disliked);
              setLiked(false);
            }}
          >
            {disliked ? (
              <img alt="share" src={BLACK_UNLIKE} className="h-4" />
            ) : (
              <img alt="share" src={UNLIKE_ICON} className="h-4 scale-x-[-1]" />
            )}
          </button>
          <button
            className="text-slate-600 font-semibold rounded-full p-2 hover:bg-stone-200"
            onClick={() => setReply(true)}
          >
            Reply
          </button>
        </div>
        {reply && (
          <div className="flex flex-col">
            <div className="flex space-x-2">
              <div className="rounded-full w-5 h-5 bg-black"></div>
              <input
                type="text"
                placeholder="Add a reply..."
                className="text-sm text-slate-600 w-full border-b-2 outline-none focus:duration-300 focus:border-black"
              />
            </div>
            <div className="flex space-x-3 justify-end mt-2">
              <button
                className="font-semibold text-sm py-2 px-3  rounded-full hover:bg-stone-200"
                onClick={() => setReply(false)}
              >
                Cancel
              </button>
              <button className="font-semibold text-sm text-white py-2 px-3 bg-blue-700 rounded-full hover:bg-blue-800">
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

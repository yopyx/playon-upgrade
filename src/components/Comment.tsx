import { useRef, useState } from "react";
import { CommentProps } from "../types/props";
import { timeDiff } from "../utils/constants";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../types/reduxHooks";
import { addComment } from "../redux/commentsSlice";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ info }: CommentProps) => {
  const [replySection, setReplySection] = useState(false);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [replyInput, setReplyInput] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const dispatch = useAppDispatch();
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
        <Link to={authorChannelUrl}>
          <img
            alt={authorDisplayName}
            referrerPolicy="no-referrer"
            src={authorProfileImageUrl}
            className="rounded-full h-8 w-8 object-cover bg-stone-200"
          ></img>
        </Link>
      ) : (
        <div className="rounded-full w-8 h-8 bg-black"></div>
      )}
      <div className="flex flex-col space-y-1">
        <div className="flex text-xs space-x-1">
          <h5 className="font-semibold">
            <a href={authorChannelUrl}>{authorDisplayName}</a>
          </h5>
          <h5 className="font-thin">
            {timeDiff(new Date().getTime() - new Date(publishedAt).getTime())}
          </h5>
        </div>
        <h4 className="text-sm w-[750px] tablet-w2:w-[650px]">
          {textOriginal}
        </h4>
        <div className="flex text-xs space-x-2">
          <button
            className="rounded-full p-2 hover:bg-stone-200"
            onClick={() => {
              setLiked(!liked);
              setDisliked(false);
            }}
          >
            {liked ? (
              <img alt="share" src={"/like (1).png"} className="h-4" />
            ) : (
              <img alt="share" src={"/like (2).png"} className="h-4" />
            )}
          </button>
          <h5 className="py-2">{likeCount + Number(liked)}</h5>
          <button
            className="rounded-full p-2 hover:bg-stone-200"
            onClick={() => {
              setDisliked(!disliked);
              setLiked(false);
            }}
          >
            {disliked ? (
              <img alt="share" src={"/dislike.png"} className="h-4" />
            ) : (
              <img
                alt="share"
                src={"/dont-like.png"}
                className="h-4 scale-x-[-1]"
              />
            )}
          </button>
          <button
            className="font-semibold rounded-full p-2 hover:bg-stone-200"
            onClick={() => setReplySection(true)}
          >
            Reply
          </button>
        </div>
        {replySection && (
          <div className="flex flex-col">
            <div className="flex space-x-2">
              <div className="rounded-full w-5 h-5 bg-black"></div>
              <input
                ref={replyInputRef}
                type="text"
                value={replyInput || ""}
                placeholder="Add a reply..."
                className="text-sm bg-stone-200 text-slate-600 w-full border-b-2 outline-none focus:duration-300 focus:border-black"
                onChange={(e) => setReplyInput(e.currentTarget.value)}
              />
            </div>
            <div className="flex space-x-3 justify-end mt-2">
              <button
                className="font-semibold text-sm py-2 px-3  rounded-full hover:bg-stone-200"
                onClick={() => setReplySection(false)}
              >
                Cancel
              </button>
              <button
                disabled={!replyInput}
                className="font-semibold text-sm text-white py-2 px-3 bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-stone-400 disabled:text-stone-200"
                onClick={() => {
                  replyInputRef.current?.value &&
                    dispatch(
                      addComment({
                        id: info.etag,
                        comment: {
                          id: uuidv4(),
                          text: replyInputRef.current.value,
                        },
                      })
                    );
                  setReplySection(false);
                }}
              >
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

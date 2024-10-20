import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { addNewComment } from "../redux/commentsSlice";
import { CommentPostState } from "../types/slicesState";
import CommentPostVer from "./CommentPostVer";

const NewComment = () => {
  const dispatch = useAppDispatch();
  const { newComments } = useAppSelector(
    (store) => store.comments
  ) as CommentPostState;
  const [replySection, setReplySection] = useState(false);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [replyInput, setReplyInput] = useState("");
  const etag = uuidv4();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col py-5">
        <div className="flex space-x-2">
          <div className="rounded-full w-8 h-8 bg-black"></div>
          <input
            ref={replyInputRef}
            type="text"
            value={replyInput || ""}
            placeholder="Add a comment..."
            className="text-sm text-slate-600 w-full border-b-2 outline-none focus:duration-300 focus:border-black"
            onFocus={() => setReplySection(true)}
            onChange={(e) => setReplyInput(e.currentTarget.value)}
          />
        </div>
        {replySection && (
          <div className="flex space-x-3 justify-end mt-2">
            <button
              className="font-semibold text-sm py-2 px-3  rounded-full hover:bg-stone-200"
              onClick={() => {
                setReplySection(false);
                setReplyInput("");
              }}
            >
              Cancel
            </button>
            <button
              disabled={!replyInput}
              className="font-semibold text-sm text-white py-2 px-3 bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-stone-400 disabled:text-stone-200"
              onClick={() => {
                replyInputRef.current?.value &&
                  dispatch(
                    addNewComment({
                      id: etag,
                      text: replyInput,
                    })
                  );
                setReplySection(false);
                setReplyInput("");
              }}
            >
              Comment
            </button>
          </div>
        )}
      </div>
      <div>
        {newComments &&
          [...newComments].reverse().map((c) => (
            <div key={c.id}>
              <CommentPostVer id={c.id} text={c.text} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewComment;

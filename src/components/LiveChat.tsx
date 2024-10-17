import { useEffect, useMemo, useRef, useState } from "react";
import { SEND_ICON } from "../utils/constants";
import LiveComment from "./LiveComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import getLiveChat from "../utils/functions/getLiveChat";
import { LiveChatProps } from "../types/props";
import { useAppDispatch, useAppSelector } from "../types/reduxHooks";
import { addLiveChatToken, addNewMessage } from "../redux/liveChatSlice";
import { LiveChatState } from "../types/slicesState";
import { updateQuota } from "../redux/ui_slices/quotaSlice";
import { useKey } from "./Body";

const LiveChat = ({ chatId }: LiveChatProps) => {
  const apiKey = useKey();
  const [chatView, setChatView] = useState(true);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { token, messages } = useAppSelector(
    (store) => store.liveChat
  ) as LiveChatState;
  const commentIdRef = useRef<HTMLInputElement>(null);
  const commentScrollRef = useRef<HTMLDivElement>(null);
  const smoothScroll = () => {
    if (commentScrollRef.current) {
      commentScrollRef.current.scrollBy({
        behavior: "smooth",
      });
    }
  };
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["live", chatId],
    initialPageParam: token[chatId] || "",
    queryFn: ({ pageParam }) => {
      dispatch(updateQuota(5));
      return getLiveChat(chatId, pageParam, apiKey);
    },
    getNextPageParam: (prevData) => prevData.nextPageToken,
  });
  const list = useMemo(() => {
    return data?.pages.flatMap((e) => e.items).slice(-200);
  }, [data]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, 2500);
    return () => {
      clearInterval(interval);
      dispatch(
        addLiveChatToken([
          chatId,
          data?.pages.flatMap((e) => e.nextPageToken)[0],
        ])
      );
    };
  }, [hasNextPage, fetchNextPage, isFetching, dispatch, data, chatId]);
  return (
    <div>
      {chatView && (
        <div className="flex flex-col mt-20 w-[400px] h-[580px] border-stone-200 border-2 rounded-xl">
          <h4 className="font-semibold py-3 px-5">Top chat</h4>
          <div className="flex flex-col-reverse overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-200 space-y-2 border-t-2 border-b-2 h-[430px] px-5 py-1.5">
            <>
              {(list || []).reverse().map((m) => (
                <div
                  ref={commentScrollRef}
                  key={m?.etag}
                  className="duration-500"
                  onScroll={smoothScroll}
                >
                  <LiveComment info={m} />
                  <input
                    type="text"
                    ref={commentIdRef}
                    defaultValue={m.etag}
                    className="hidden"
                  />
                  {messages[chatId]?.[m.etag] && (
                    <div className="flex space-x-2 text-xs mt-2">
                      <div className="h-6 w-6 rounded-full bg-black" />
                      <h5 className="">
                        <span className="text-stone-400">user </span>
                        {messages[chatId][m.etag]}
                      </h5>
                    </div>
                  )}
                </div>
              ))}
            </>
          </div>
          <form className="w-full border-b-2 flex justify-center">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="Chat..."
              className="w-[320px] py-1.5 px-3 my-2 rounded-full bg-stone-100 outline-none"
            />
            <button
              type="button"
              className="px-4 rounded-full scale-90 hover:bg-stone-200"
              onClick={() => {
                dispatch(
                  addNewMessage([chatId, commentIdRef.current?.value, text])
                );
                setText("");
              }}
            >
              <img
                alt="share"
                src={SEND_ICON}
                className="h-5 w-5 rotate-[45deg]"
              />
            </button>
          </form>
          <button
            className="text-slate-600 font-semibold rounded-full p-1.5 mx-1 my-auto relative z-10 hover:bg-stone-200"
            onClick={() => setChatView(false)}
          >
            Hide chat
          </button>
        </div>
      )}
      {!chatView && (
        <button
          className="mt-20 -ml-1 w-[400px] text-slate-600 border font-semibold rounded-full p-1.5 mx-1 my-auto relative z-10 hover:bg-stone-200"
          onClick={() => setChatView(true)}
        >
          Show chat
        </button>
      )}
    </div>
  );
};

export default LiveChat;

import { useEffect, useMemo, useRef, useState } from "react";
import LiveComment from "./LiveComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import getLiveChat from "../utils/functions/getLiveChatAsync";
import { LiveChatProps } from "../types/props";
import SpinShimmer from "./shimmer/SpinShimmer";
import { useNavigate } from "react-router";
// import { LiveChatState } from "../types/slicesState";

const LiveChat = ({ videoId, lightTheme }: LiveChatProps) => {
  const [chatView, setChatView] = useState(true);
  //const [text, setText] = useState("");
  // const [replied,setReplied] = useState(false);
  // const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const commentIdRef = useRef<HTMLInputElement>(null);
  const commentScrollRef = useRef<HTMLDivElement>(null);
  // const messages = useAppSelector(
  //   (store) => store.liveChat.messages[videoId],
  // ) as LiveChatState["messages"][string];
  //const { name } = useAppSelector((store) => store.user);

  const smoothScroll = () => {
    if (commentScrollRef.current) {
      commentScrollRef.current.scrollTo({
        top: commentScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // commentScrollRef.current.scrollBy({
    //   behavior: "smooth",
    // });
  };

  const { data, isFetching, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["live", videoId],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => {
        return getLiveChat(videoId, pageParam);
      },
      getNextPageParam: (prevData, _, lastPage) =>
        prevData.chatData.queryNextPage
          ? prevData.chatData.liveCommentList.length === 0
            ? lastPage
            : ++lastPage
          : undefined,
    });
  const list = useMemo(() => {
    return data?.pages.flatMap((e) => e.chatData.liveCommentList).reverse();
  }, [data]);
  const pollingInterval = useMemo(() => {
    return data?.pages.flatMap((e) => e.chatData.pollingIntervalMillis)[0];
  }, [data]);
  useEffect(() => {
    if (pollingInterval && pollingInterval > 0) {
      const interval = setInterval(() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }, pollingInterval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [hasNextPage, fetchNextPage, isFetching, pollingInterval]);

  useEffect(() => {
    if (data?.pages.flatMap((page) => page.status)[0] === 401) {
      navigate("/signin");
    }
  });
  if (isLoading) {
    return <SpinShimmer />;
  }
  if (isError) {
    return (
      <h4
        className={`mt-20 text-center font-semibold ${lightTheme ? "" : "text-white"}`}
      >
        Error loading live chat
      </h4>
    );
  }

  return (
    <div>
      {chatView && (
        <div className="flex flex-col mt-20 w-[400px] h-[580px] sub3:w-full border-stone-200 border-2 rounded-xl">
          <h4
            className={`font-semibold py-3 px-5${
              lightTheme ? "" : " text-white"
            }`}
          >
            Top chat
          </h4>
          <div className="flex flex-col-reverse bg-stone-200/30 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-200 space-y-2 border-t-2 border-b-2 h-[430px] px-5 py-1.5">
            <>
              {isLoading || isError ? (
                <SpinShimmer />
              ) : (
                list!.map((m) => {
                  return (
                    <div
                      ref={commentScrollRef}
                      key={m.id}
                      className="duration-500"
                      onScroll={smoothScroll}
                    >
                      <LiveComment info={m} lightTheme={lightTheme} />
                      {/* <input
                        type="text"
                        // ref={commentIdRef}
                        className="hidden"
                      />
                      {replied&&messages?.[m.id] && (
                        <div className="flex space-x-2 text-xs mt-2">
                          <div className="h-6 w-6 rounded-full bg-black" />
                          <h5 className="">
                            <span
                              className={`${lightTheme ? "text-stone-600" : "text-stone-400"}`}
                            >
                              {"@" + name + " "}
                            </span>
                            {messages?.[m.id]}
                          </h5>
                        </div>
                      )} */}
                    </div>
                  );
                })
              )}
            </>
          </div>
          {/* <form className="w-full border-b-2 flex justify-center">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // dispatch(
                  //   addNewMessage([videoId, commentIdRef.current?.value, text]),
                  // );
                  setText("");
                }
              }}
              placeholder="Chat..."
              className="w-[320px] py-1.5 px-3 my-2 rounded-full bg-stone-100 outline-none"
            />
            <button
              type="button"
              className="px-4 rounded-full scale-90 hover:bg-stone-200"
              onClick={() => {
                //setReplied(true);
                // dispatch(
                //   addNewMessage([videoId, commentIdRef.current?.value, text]),
                // );
                setText("");
              }}
            >
              <img
                alt="share"
                src={"/send.png"}
                className={`h-5 w-5 rotate-[45deg]${
                  lightTheme ? "" : " invert"
                }`}
              />
            </button>
          </form> */}
          <button
            className={`${
              lightTheme ? "" : "text-white "
            }text-slate-600 font-semibold rounded-full p-1.5 mx-1 my-auto relative z-10 hover:bg-stone-200`}
            onClick={() => setChatView(false)}
          >
            Hide chat
          </button>
        </div>
      )}
      {!chatView && (
        <button
          className={`mt-20 -ml-1 w-[400px]${
            lightTheme ? "" : " text-white"
          } sub3:w-full text-slate-600 border font-semibold rounded-full p-1.5 mx-1 my-auto relative z-10 hover:bg-stone-200`}
          onClick={() => setChatView(true)}
        >
          Show chat
        </button>
      )}
    </div>
  );
};

export default LiveChat;

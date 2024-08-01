import { useState } from "react";
import { SEND_ICON } from "../utils/constants";
import LiveComment from "./LiveComment";
import { useAppDispatch } from "../types/reduxHooks";

const LiveChat = ({ chatId }: { chatId: string }) => {
  const [chatView, setChatView] = useState(true);
  const dispatch = useAppDispatch();
  return (
    <div>
      {chatView && (
        <div className="flex flex-col mt-10 w-[400px] h-[580px] border-stone-200 border-2 rounded-xl">
          <h4 className="font-semibold py-3 px-5">Top chat</h4>
          <div className="flex flex-col-reverse overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-200 space-y-2 border-t-2 border-b-2 h-[430px] px-5 py-1.5">
            <div className="">
              {[]?.map((m) => (
                <LiveComment info={m} key={m?.etag} />
              ))}
            </div>
          </div>
          <form className="w-full border-b-2 flex justify-center">
            <input
              type="text"
              placeholder="Chat..."
              className="w-[320px] py-1.5 px-3 my-2 rounded-full bg-stone-100 outline-none"
            />
            <button className="px-4 rounded-full scale-90 hover:bg-stone-200">
              <img
                alt="share"
                src={SEND_ICON}
                className="h-5 w-5 rotate-[45deg]"
              />
            </button>
          </form>
          <button
            className="text-slate-600 font-semibold rounded-full p-1.5 mx-1 my-auto hover:bg-stone-200"
            onClick={() => setChatView(false)}
          >
            Hide chat
          </button>
        </div>
      )}
      {!chatView && (
        <button
          className="mt-10 -ml-1 w-[400px] text-slate-600 border font-semibold rounded-full p-1.5 mx-1 my-auto hover:bg-stone-200"
          onClick={() => setChatView(true)}
        >
          Show chat
        </button>
      )}
    </div>
  );
};

export default LiveChat;

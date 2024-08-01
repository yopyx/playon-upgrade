import { LiveChatData } from "../../types/fetchedData";
import { CORS, YT_LIVE_CHAT_API } from "../constants";

const getLiveChat = async (chatId: string) => {
  const url = CORS + encodeURIComponent(YT_LIVE_CHAT_API(chatId));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data as LiveChatData;
};
export default getLiveChat;

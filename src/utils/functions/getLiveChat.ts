import { LiveChatData } from "../../types/fetchedData";

const getLiveChat = async (
  chatId: string,
  nextToken: string,
  apiKey: string
) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/live-chat?chatId=${chatId}&nextToken=${nextToken}&apiKey=${apiKey}`
      : `http://localhost:3000/live-chat?chatId=${chatId}&nextToken=${nextToken}&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return JSON.parse(data.contents) as LiveChatData;
};
export default getLiveChat;

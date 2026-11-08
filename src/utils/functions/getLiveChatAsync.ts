import { LiveChatList, LiveChatWithStatus } from "../../types/fetchedData";

const getLiveChatAsync = async (vidId: string, pageNum: number) => {
  const url = `/api/liveChat?videoId=${vidId}&pageNum=${pageNum}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      chatData: {
        liveCommentList: [],
        queryNextPage: false,
        pollingIntervalMillis: 0,
      },
      status: response.status,
    } as LiveChatWithStatus;
  }
  const chatData = (await response.json()) as LiveChatList;
  return {
    chatData,
    status: response.status,
  } as LiveChatWithStatus;
};
export default getLiveChatAsync;

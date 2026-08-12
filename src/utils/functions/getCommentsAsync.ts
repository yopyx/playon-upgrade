import {
  CommentsListData,
  CommentsListWithStatus,
} from "../../types/fetchedData";

const getCommentsAsync = async (videoId: string, pageNum: number) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/resources_api/comments?videoId=${videoId}&pageNum=${pageNum}`
      : `/resources_api/comments?videoId=${videoId}&pageNum=${pageNum}`;
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.status !== 200) {
    return {
      commentsData: { commentsList: [], queryNextPage: false },
      status: response.status,
    } as CommentsListWithStatus;
  }
  const commentsData = (await response.json()) as CommentsListData;

  return { commentsData, status: response.status } as CommentsListWithStatus;
};
export default getCommentsAsync;

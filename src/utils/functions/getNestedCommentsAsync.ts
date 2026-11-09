import {
  NestedComment,
  NestedCommentsListWithStatus,
} from "../../types/fetchedData";

const getNestedCommentsAsync = async (commentId: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT == "development"
      ? `/api/replies?commentId=${commentId}`
      : `https://playon-auth.runasp.net/api/replies?commentId=${commentId}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      commentsData: [],
      status: response.status,
    } as NestedCommentsListWithStatus;
  }

  const commentsData = (await response.json()) as NestedComment[];
  return {
    commentsData,
    status: response.status,
  } as NestedCommentsListWithStatus;
};
export default getNestedCommentsAsync;

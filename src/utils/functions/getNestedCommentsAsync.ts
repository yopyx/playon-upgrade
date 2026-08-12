import {
  NestedComment,
  NestedCommentsListWithStatus,
} from "../../types/fetchedData";

const getNestedCommentsAsync = async (commentId: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `/resources_api/replies?commentId=${commentId}`
      : `https://localhost:7117/resources_api/replies?commentId=${commentId}`;
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

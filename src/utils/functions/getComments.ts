import { CommentsListData } from "../../types/fetchedData";

const getComments = async (videoId: string, nextToken = "", apiKey: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/comments?videoId=${videoId}&nextToken=${nextToken}&apiKey=${apiKey}`
      : `http://localhost:3000/comments?videoId=${videoId}&nextToken=${nextToken}&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data as CommentsListData;
};
export default getComments;

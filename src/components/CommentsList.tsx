import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentsListProps } from "../types/props";
import Comment from "./Comment";
import getComments from "../utils/custom hooks/getComments";
import { useMemo } from "react";

const CommentsList = ({ vidId, list }: CommentsListProps) => {
  const {
    data,
    status,
    error,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    initialPageParam: "",
    queryFn: ({ pageParam }) => getComments(vidId, pageParam),
    getNextPageParam: (prevData) => prevData.nextPageToken,
    enabled: Boolean(vidId),
  });
  const dataList = useMemo(() => {
    return data?.pages[0].items;
  }, [data]);
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div>
      {dataList?.map((c) => (
        <div key={c?.id}>
          <Comment info={c}></Comment>
          <div className="p-2 pl-10">
            {c?.replies && (
              <CommentsList list={c?.replies?.comments} vidId=""></CommentsList>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;

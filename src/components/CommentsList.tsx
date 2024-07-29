import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentsListProps } from "../types/props";
import Comment from "./Comment";
import getComments from "../utils/custom hooks/getComments";
import { useCallback, useRef } from "react";

const CommentsList = ({ vidId, list, query }: CommentsListProps) => {
  const observer = useRef<IntersectionObserver>();
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", vidId],
    initialPageParam: "",
    queryFn: ({ pageParam }) => getComments(vidId, pageParam),
    getNextPageParam: (prevData) => prevData.nextPageToken,
    enabled: query,
  });
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, isLoading, hasNextPage, fetchNextPage]
  );
  const dataList = query ? data?.pages.flatMap((page) => page.items) : list;
  if (query) {
    if (status === "pending") {
      return <div>Loading...</div>;
    }
    if (status === "error") {
      return <div>{JSON.stringify(error)}</div>;
    }
  }
  return (
    <>
      {dataList?.map((c, i) => (
        <div key={c?.id}>
          <div ref={i === dataList.length - 1 && query ? lastElementRef : null}>
            <Comment info={c} />
          </div>
          {c.snippet.totalReplyCount ? (
            <div className="p-2 pl-10">
              <CommentsList
                list={c?.replies?.comments}
                vidId={vidId}
                query={false}
              />
            </div>
          ) : null}
        </div>
      ))}
      {query && isFetchingNextPage && <div>Loading...</div>}
    </>
  );
};

export default CommentsList;

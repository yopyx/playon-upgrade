import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentsListProps } from "../types/props";
import Comment from "./Comment";
import getComments from "../utils/functions/getComments";
import { useCallback, useRef } from "react";
import { CommentsListPostVer } from "./CommentsListPostVer";
import { useAppDispatch } from "../types/reduxHooks";
import { updateQuota } from "../redux/ui_slices/quotaSlice";
import { useKey } from "./Body";
import NewComment from "./NewComment";

const CommentsList = ({ vidId, list, query }: CommentsListProps) => {
  const dispatch = useAppDispatch();
  const apiKey = useKey();
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
    queryFn: ({ pageParam }) => {
      dispatch(updateQuota(5));
      return getComments(vidId, pageParam, apiKey);
    },
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
      <NewComment />
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
          <div className="pl-10">
            <CommentsListPostVer id={c.etag} />
          </div>
        </div>
      ))}
      {query && isFetchingNextPage && <div>Loading...</div>}
    </>
  );
};

export default CommentsList;

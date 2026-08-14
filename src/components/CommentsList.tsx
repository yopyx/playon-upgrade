import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CommentsListProps } from "../types/props";
import Comment from "./Comment";
import getComments from "../utils/functions/getCommentsAsync";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommentsListPostVer } from "./CommentsListPostVer";
import { CommentsListWithStatus } from "../types/fetchedData";
import getNestedCommentsAsync from "../utils/functions/getNestedCommentsAsync";
import SpinShimmer from "./shimmer/SpinShimmer";
import { useNavigate } from "react-router-dom";

const CommentsList = ({ vidId, commentId, isNested }: CommentsListProps) => {
  const navigate = useNavigate();
  const [expandedReplies, setExpandedReplies] = useState(new Set<string>());
  const toggleReplies = (cId: string) => {
    setExpandedReplies((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.has(cId) ? nextSet.delete(cId) : nextSet.add(cId);
      return nextSet;
    });
  };
  const observer = useRef<IntersectionObserver>();

  const {
    data,
    status,
    isFetching,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", vidId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getComments(vidId, pageParam);
    },
    getNextPageParam: (prevData: CommentsListWithStatus, _, lastPage) =>
      prevData.commentsData.queryNextPage ? ++lastPage : undefined,
    enabled: !isNested,
  });

  const repliesList = useQuery({
    queryKey: ["nested comments", commentId],
    queryFn: () => getNestedCommentsAsync(commentId || ""),
    enabled: isNested && !!commentId,
    gcTime: 10 * 60 * 1000, // keep collapsed reply threads cached longer
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
    [isFetching, isLoading, hasNextPage, fetchNextPage],
  );
  const dataList = useMemo(() => {
    return data?.pages.flatMap((page) => page.commentsData.commentsList);
  }, [data?.pages]);
  const replies = useMemo(() => {
    return repliesList.data?.commentsData;
  }, [repliesList.data]);
  const commentList = useMemo(() => {
    return isNested ? replies : dataList;
  }, [isNested, replies, dataList]);

  useEffect(() => {
    if (data?.pages.flatMap((page) => page.status)[0] === 401) {
      navigate("/signin");
    }
  });

  if (
    (!isNested && status === "pending") ||
    (isNested && repliesList.isLoading)
  ) {
    return <SpinShimmer />;
  }
  if (data?.pages.flatMap((page) => page.status)[0] === 403) {
    return <p className="text-lg">Comments are turned off.</p>;
  } else if (
    (!isNested && status === "error") ||
    (isNested && repliesList.isError)
  ) {
    // return (
    //   <div>{JSON.stringify((error ? error : repliesList.error)!.message)}</div>
    // );
    return <p className="text-lg">Comments are unavailable</p>;
  }
  return (
    commentList &&
    commentList.length && (
      <>
        {commentList!.map((c, i) => (
          <div key={c.id}>
            <div
              ref={
                i === commentList!.length - 1 && !isNested
                  ? lastElementRef
                  : null
              }
            >
              <Comment info={c} />
            </div>
            {!isNested && c?.totalReplyCount ? (
              <div className="p-2 pl-10">
                <button
                  hidden={expandedReplies.has(c.id)}
                  className="font-semibold text-sm rounded-full p-2 hover:bg-stone-200"
                  onClick={() => toggleReplies(c.id)}
                >
                  {c?.totalReplyCount || ""} replies
                </button>
                {expandedReplies.has(c.id) && (
                  <>
                    <CommentsList
                      vidId={vidId}
                      isNested={true}
                      commentId={c.id}
                    />
                    <button
                      className="font-semibold text-sm rounded-full p-2 hover:bg-stone-200"
                      onClick={() => toggleReplies(c.id)}
                    >
                      Hide replies
                    </button>
                  </>
                )}
              </div>
            ) : null}
            <div className="pl-10">
              <CommentsListPostVer id={c.id} />
            </div>
          </div>
        ))}
        {!isNested && isFetchingNextPage && <SpinShimmer />}
      </>
    )
  );
};

export default CommentsList;

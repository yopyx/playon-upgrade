import { useAppSelector } from "../types/reduxHooks";
import { CommentPostState } from "../types/slicesState";
import CommentPostVer from "./CommentPostVer";

export const CommentsListPostVer = ({ id }: { id: string }) => {
  const { comments } = useAppSelector(
    (store) => store.comments
  ) as CommentPostState;
  return (
    <div>
      {comments[id]?.map((c) => (
        <div key={c.id}>
          <CommentPostVer id={c.id} text={c.text} />
        </div>
      ))}
    </div>
  );
};

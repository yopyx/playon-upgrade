import { CommentPostVersion } from "../types/fetchedData";
import { useAppSelector } from "../types/reduxHooks";
import CommentPostVer from "./CommentPostVer";

export const CommentsListPostVer = ({ id }: { id: string }) => {
  const comments: CommentPostVersion[] = useAppSelector(
    (store) => store.comments[id]
  );
  return (
    <div>
      {comments?.map((c) => (
        <div key={c.id}>
          <CommentPostVer id={c.id} text={c.text} />
        </div>
      ))}
    </div>
  );
};

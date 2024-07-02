import {
  Category,
  CommentDetails,
  NestedCommentDetails,
  VideoDetails,
} from "./fetchedData";

export type ButtonProps = {
  categoryData: Category;
  clicked: boolean;
  setClicked: (state: string) => void;
};

export type VideoCardProps = { info: VideoDetails; imgUrl: string | undefined };
export type CommentsListProps = {
  vidId: string;
  list?: NestedCommentDetails[];
};
export type CommentProps = {
  info: CommentDetails | NestedCommentDetails;
};

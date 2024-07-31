import {
  Category,
  ChannelDetails,
  CommentDetails,
  NestedCommentDetails,
  VideoDetails,
} from "./fetchedData";

export type ButtonProps = {
  categoryData?: Category;
  title: string;
  clicked: boolean;
  setClicked: (state: string) => void;
};

export type VideoCardProps = { info: VideoDetails; imgUrl: string | undefined };
export type CommentsListProps = {
  vidId: string;
  list?: NestedCommentDetails[];
  query: boolean;
};
export type CommentProps = {
  info: CommentDetails | NestedCommentDetails;
};

export type DetailedVideoCardProps = {
  info: VideoDetails;
  channelData: ChannelDetails | undefined;
};

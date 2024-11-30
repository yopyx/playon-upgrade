import {
  Category,
  ChannelDetails,
  CommentDetails,
  LiveChatComment,
  NestedCommentDetails,
  VideoDetails,
} from "./fetchedData";

export type ButtonProps = {
  categoryData?: Category;
  title: string;
  clicked: boolean;
  setClicked: (state: string) => void;
  lightTheme: boolean;
};

export type VideoCardProps = {
  info: VideoDetails;
  imgUrl: string | undefined;
  lightTheme: boolean;
};
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
  lightTheme: boolean;
};
export type LiveChatProps = { chatId: string; lightTheme: boolean };
export type LiveCommentProps = { info: LiveChatComment; lightTheme: boolean };

export type SideBarProps = {
  lightTheme: boolean;
};
export type HeaderProps = {
  lightTheme: boolean;
};

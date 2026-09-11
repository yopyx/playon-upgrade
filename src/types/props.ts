import {
  Category,
  Comment,
  LiveChatComment,
  NestedComment,
  VideoCardData,
} from "./fetchedData";
import { SideBarSliceState } from "./slicesState";

export type ButtonProps = {
  categoryData?: Category;
  title: string;
  clicked: boolean;
  setClicked: (state: string) => void;
};

export type VideoCardProps = {
  info: VideoCardData;
  lightTheme: boolean;
  isPriority: boolean;
};
export type CommentsListProps = {
  vidId: string;
  commentId?: string;
  isNested: boolean;
};
export type CommentProps = {
  info: Comment | NestedComment;
};
export type LiveChatProps = { videoId: string; lightTheme: boolean };
export type LiveCommentProps = {
  info: LiveChatComment;
  lightTheme: boolean;
};

export type HeaderProps = {
  lightTheme: boolean;
};

export type UiProps = {
  lightTheme: boolean;
  sidebarState: SideBarSliceState;
};

export type SidebarProps = {
  uiStates: UiProps;
};

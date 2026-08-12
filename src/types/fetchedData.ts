export type Category = {
  id: string;
  etag?: string;
  title: string;
};
export type CategoryListWithStatus = {
  categories: Category[];
  status: number;
};

export type Comment = {
  id: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  likeCount: number;
  totalReplyCount: number;
  publishedAt: string;
  listEtag: string;
};
export type CommentsListData = {
  commentsList: Comment[];
  queryNextPage: boolean;
};

export type CommentsListWithStatus = {
  commentsData: CommentsListData;
  status: number;
};

export type NestedComment = {
  id: string;
  parentId: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  likeCount: number;
  totalReplyCount?: number;
  publishedAt: string;
};

export type NestedCommentsListWithStatus = {
  commentsData: NestedComment[];
  status: number;
};

export type VideoCardData = {
  videoId: string;
  channelId: string;
  etag: string;
  listEtag: string;
  title: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: ThumbnailSize;
  channelThumbnails: ThumbnailSize;
  tags: string[];
  liveBroadcastContent: string;
  duration: string;
  subscriberCount: string;
  statistics: ObjectStr;
  liveStreamingDetails: ObjectStr;
};
export type VideoCardListData = {
  videoCardList: VideoCardData[];
  queryNextPage: boolean;
};

export type VideoCardListWithStatus = {
  videosData: VideoCardListData;
  status: number;
};

type ThumbnailDetails = {
  url: string;
  width: number;
  height: number;
};

type ThumbnailSize = {
  [size: string]: ThumbnailDetails;
};
export type ObjectStr = {
  [name: string]: string;
};
export type ObjectStr2 = {
  [name: string]: string[];
};
export type LiveChatComment = {
  id: string;
  publishedAt: string;
  displayMessage: string;
  displayName: string;
  profileImageUrl: string;
  listEtag: string;
};
export type LiveChatList = {
  liveCommentList: LiveChatComment[];
  queryNextPage: boolean;
  pollingIntervalMillis?: number;
};

export type LiveChatWithStatus = {
  chatData: LiveChatList;
  status: number;
};

export type CommentPostVersion = {
  id: string;
  text: string;
};

export type SearchSuggestions = {
  text: string;
  suggestions: string[];
};

export type SearchSuggestionsWithStatus = {
  searchSuggestions: SearchSuggestions;
  status: number;
};

export type WatchedVideoWithStatus = {
  videoData: VideoCardData;
  status: number;
};

export interface WatchingHistory {
  [date: string]: VideoCardData[];
}

export type HistoryWithStatus = {
  history: WatchingHistory;
  status: number;
};

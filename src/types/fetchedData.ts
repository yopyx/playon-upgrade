type Snippet = {
  title: string;
  assignable?: boolean;
  channelId?: string;
};

export type Category = {
  kind?: string;
  etag?: string;
  id: string;
  snippet: Snippet;
};

export type VideoDetails = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: ThumbnailSize;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: ObjectStr;
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: object;
    projection: string;
  };
  statistics: ObjectStr;
  liveStreamingDetails: ObjectStr;
};
export type ChannelDetails = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: ThumbnailSize;
    localized: ObjectStr;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
};
export type NestedCommentDetails = {
  kind: string;
  etag: string;
  id: string;
  replies?: {
    comments: NestedCommentDetails[];
  };
  snippet: {
    channelId: string;
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
    totalReplyCount?: undefined;
  };
};
export type CommentDetails = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: {
      kind: string;
      etag: string;
      id: string;
      snippet: {
        channelId: string;
        videoId: string;
        textDisplay: string;
        textOriginal: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        authorChannelUrl: string;
        authorChannelId: {
          value: string;
        };
        canRate: boolean;
        viewerRating: string;
        likeCount: number;
        publishedAt: string;
        updatedAt: string;
      };
    };
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies?: {
    comments: NestedCommentDetails[];
  };
};

export type CommentsListData = {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: CommentDetails[];
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
export type VideosListData = {
  kind: string;
  etag: string;
  items: VideoDetails[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type FetchedVideoCardData = {
  videosData: VideosListData;
  channelsData: ChannelDetails[];
};

export type SearchResultedVideo = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};
export type FetchedSearchResults = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResultedVideo[];
};
export type LiveChatComment = {
  kind?: string;
  etag: string;
  id?: string;
  snippet: {
    type?: string;
    liveChatId?: string;
    authorChannelId?: string;
    publishedAt?: string;
    hasDisplayContent?: boolean;
    displayMessage: string;
    textMessageDetails?: {
      messageText: string;
    };
  };
  authorDetails: {
    channelId?: string;
    channelUrl?: string;
    displayName: string;
    profileImageUrl: string;
    isVerified?: boolean;
    isChatOwner?: boolean;
    isChatSponsor?: boolean;
    isChatModerator?: boolean;
  };
};
export type LiveChatData = {
  kind: string;
  etag: string;
  pollingIntervalMillis: number;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken: string;
  items: LiveChatComment[];
};
export type CommentPostVersion = {
  id: string;
  text: string;
};

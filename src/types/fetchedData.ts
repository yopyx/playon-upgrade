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

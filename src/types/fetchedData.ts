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

type VideoDetails = {
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
};

type ThumbnailDetails = {
  url: string;
  width: number;
  height: number;
};

type ThumbnailSize = {
  (size: string): ThumbnailDetails;
};
type ObjectStr = {
  (name: string): string;
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

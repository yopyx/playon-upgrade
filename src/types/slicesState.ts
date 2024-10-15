import {
  ChannelDetails,
  CommentPostVersion,
  LiveChatComment,
  VideoDetails,
} from "./fetchedData";

export type SearchSuggestionsState = {
  [text: string]: string[];
};
export type SearchSliceState = {
  searchTextStored: string;
  searchTag: string;
  suggestionCategory: string;
};

export type ChannelState = {
  channels: { [id: string]: ChannelDetails };
};

export type CommentPostState = {
  [id: string]: CommentPostVersion[];
};
export type LiveChatState = {
  chat: LiveChatComment[];
  token: { [id: string]: string };
  messages: { [id: string]: { [id: string]: string } };
};
export type VideoState = {
  [id: string]: VideoDetails;
};

export type SideBarSliceState = { collapseSidebar: boolean };

export type QuotaSliceState = { quota: number; keys: string[] };

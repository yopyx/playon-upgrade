import { ChannelDetails, CommentPostVersion } from "./fetchedData";

export type SearchSuggestionsState = {
  [text: string]: string[];
};
export type SearchSliceState = {
  searchTextStored: string;
  suggestionCategory: string;
};

export type ChannelState = {
  channels: { [id: string]: ChannelDetails };
};

export type CommentPostState = {
  [id: string]: CommentPostVersion[];
};

import { ChannelDetails } from "./fetchedData";

export type SearchSuggestionsState = {
  [text: string]: string[];
};
export type SearchSliceState = {
  search: string;
  suggestions: string;
};

export type ChannelState = {
  channels: { [id: string]: ChannelDetails };
};

import { CommentPostVersion } from "./fetchedData";

export type SearchSuggestionsState = {
  [text: string]: string[];
};
export type SearchSliceState = {
  searchTextShown: string;
  searchTextStored: string;
  searchTag: string;
  videoTitle: string;
};

export type CommentPostState = {
  comments: { [id: string]: CommentPostVersion[] };
  newComments: { id: string; text: string }[];
};
export type LiveChatState = {
  messages: { [id: string]: { [id: string]: string } };
};

export type SideBarSliceState = { [x: string]: { collapseSidebar: boolean } };

export type QuotaSliceState = { quota: number; keys: string[] };

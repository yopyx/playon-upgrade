type Snippet = {
  title: string;
  assignable: boolean;
  channelId: string;
};

export type Category = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

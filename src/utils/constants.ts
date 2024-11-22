//apis urls
export const CORS = "https://corsproxy.io/?";
export const YT_API = (vidCategoryId = "0", nextToken = "", apiKey: string) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12${
    nextToken ? "&pageToken=" + nextToken : ""
  }&regionCode=US&videoCategoryId=${vidCategoryId}&key=${apiKey}`;
export const YT_VIDEO_BY_ID_API = (idArray: string[], apiKey: string) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${idArray.join(
    "%2C"
  )}&key=${apiKey}`;
export const YT_LIVE_CHAT_API = (
  chatId: string,
  nextToken = "",
  apiKey: string
) =>
  `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}${
    nextToken ? "&pageToken=" + nextToken : ""
  }&part=snippet%2CauthorDetails&key=${apiKey}`;
export const YT_API_Channels = (ids: string, apiKey: string) =>
  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&key=${apiKey}`;

export const YT_SEARCH_API = (searchText = "") =>
  `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchText}`;
export const YT_COMMENTS_API = (
  vidId: string,
  nextToken = "",
  apiKey: string
) =>
  `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies${
    nextToken ? "&pageToken=" + nextToken : ""
  }&videoId=${vidId}&key=${apiKey}`;
export const YT_VID_CATEG_API = (apiKey: string) =>
  `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`;
export const YT_SEARCH_RESULTS_API = (
  searchText = "",
  nextToken = "",
  apiKey: string
) =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25${
    nextToken ? "&pageToken=" + nextToken : ""
  }&q=${searchText}&key=${apiKey}`;

// functions
export const timeDiff = (ms = 0) => {
  const seconds = ms / 1000;
  switch (true) {
    case seconds >= 0 && seconds < 60:
      return seconds < 1
        ? "just now"
        : seconds === 1
        ? "a second ago"
        : `${Math.floor(seconds)} seconds ago`;
    case seconds >= 60 && seconds < 3600:
      return Math.floor(seconds / 60) === 1
        ? "a minute ago"
        : `${Math.floor(seconds / 60)} minutes ago`;
    case seconds >= 3600 && seconds < 24 * 3600:
      return Math.floor(seconds / 3600) === 1
        ? "an hour ago"
        : `${Math.floor(seconds / 3600)} hours ago`;
    case seconds >= 24 * 3600 && seconds < 7 * 24 * 3600:
      return Math.floor(seconds / (24 * 3600)) === 1
        ? "a day ago"
        : `${Math.floor(seconds / (24 * 3600))} days ago`;
    case seconds >= 7 * 24 * 3600:
      return Math.floor(seconds / (7 * 24 * 3600)) === 1
        ? "a week ago"
        : `${Math.floor(seconds / (7 * 24 * 3600))} weeks ago`;
    default:
      return;
  }
};

export const handleViewsCount = (views = "") => {
  return views.length > 9
    ? (+views / 1000000000).toFixed(1) + "B"
    : views.length > 6
    ? (+views / 1000000).toFixed(1) + "M"
    : views.length > 3
    ? (+views / 1000).toFixed(0) + "K"
    : views;
};

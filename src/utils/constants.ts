//apis urls
export const CORS = "https://corsproxy.io/?";
const apiKey = import.meta.env.VITE_APP_YT_KEY;
export const YT_API = (vidCategoryId = "0", nextToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12${
    nextToken ? "&pageToken=" + nextToken : ""
  }&regionCode=US&videoCategoryId=${vidCategoryId}&key=${apiKey}`;
export const YT_VIDEO_BY_ID_API = (idArray: string[]) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${idArray.join(
    "%2C"
  )}&key=${apiKey}`;
export const YT_LIVE_CHAT_API = [
  `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=`,
  `&part=snippet%2CauthorDetails&key=${apiKey}`,
];
export const YT_API_Channels = [
  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=`,
  `&key=${apiKey}`,
];

export const YT_SEARCH_API = (searchText = "") =>
  `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchText}`;
export const YT_COMMENTS_API = (vidId: string, nextToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies${
    nextToken ? "&pageToken=" + nextToken : ""
  }&videoId=${vidId}&key=${apiKey}`;
export const YT_VID_CATEG_API = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`;
export const YT_SEARCH_RESULTS_API = (searchText = "", nextToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25${
    nextToken ? "&pageToken=" + nextToken : ""
  }&q=${searchText}&key=${apiKey}`;

//icons urls
export const HAMBURGER_ICON =
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg";
export const YOUTUBE_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg";
export const USER_LOGO = "https://www.svgrepo.com/show/60372/profile-user.svg";
export const NOTIFY_BELL =
  "https://pic.onlinewebfonts.com/thumbnails/icons_207330.svg";
export const CREATE_VIDEO =
  "https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/add-video-icon.png";
export const HOME_ICON =
  "https://icons.veryicon.com/png/o/miscellaneous/skent-icon/home-225.png";
export const SHORTS_ICON =
  "https://i.pinimg.com/736x/17/d2/18/17d21878c22fe49e7e4752eecaa36541.jpg";
export const SUBSCRIBE_ICON =
  "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3264373/subscriptions-icon-md.png";
export const YOUR_VIDEO = "https://www.svgrepo.com/show/202071/youtube.svg";
export const YOUR_CHANNEL =
  "https://cdn.iconscout.com/icon/free/png-512/free-user-square-3605383-3005463.png?f=webp&w=256";
export const HISTORY_ICON =
  "https://cdn-icons-png.flaticon.com/512/2961/2961948.png?ga=GA1.1.1368992213.1703368964&";
export const WATCH_LATER =
  "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3430540/clock-icon-md.png";
export const YOUR_CLIPS =
  "https://pic.onlinewebfonts.com/thumbnails/icons_536288.svg";
export const TRENDING =
  "https://cdn4.iconfinder.com/data/icons/lucid-interface/24/fire_flame_trend_hot_spark-512.png";
export const LIVE_ICON =
  "https://static-00.iconduck.com/assets.00/live-icon-144x106-fqofsbqr.png";
export const MUSIC_ICON =
  "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3196974/music-note-icon-md.png";
export const GAMING_ICON =
  "https://flyclipart.com/thumbs/console-controller-game-gameconsole-gaming-pad-play-white-game-controller-1045706.png";
export const SPORT_ICON =
  "https://static.vecteezy.com/system/resources/previews/026/557/302/non_2x/trophy-icon-design-template-in-white-background-free-vector.jpg";
export const YT_ICON =
  "https://w7.pngwing.com/pngs/1009/93/png-transparent-youtube-computer-icons-logo-youtube-angle-social-media-share-icon.png";
export const YT_POLY_ICON =
  "https://cdn2.iconfinder.com/data/icons/social-media-hexagon-design/512/youtube-512.png";
export const YT_CIRCLE_ICON =
  "https://static.vecteezy.com/system/resources/previews/017/395/384/non_2x/youtube-music-icon-free-png.png";
export const YT_KIDS_ICON =
  "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-kids-icon.png";
export const SETTINGS_ICON =
  "https://www.iconpacks.net/icons/1/free-icon-settings-960.png";
export const REPORT_ICON =
  "https://cdn-icons-png.flaticon.com/512/6000/6000197.png";
export const HELP_ICON =
  "https://static-00.iconduck.com/assets.00/question-mark-circled-icon-512x512-wsm5hkwj.png";
export const FEEDBACK_ICON =
  "https://flyclipart.com/thumb2/exclamation-point-png-icon-free-download-740554.png";

export const LIKE_ICON =
  "https://static-00.iconduck.com/assets.00/thumbs-up-icon-144x138-tjjm2poo.png";
export const BLUE_LIKE =
  "https://static-00.iconduck.com/assets.00/favorite-thumb-like-icon-140x144-pkjgo8ns.png";
export const UNLIKE_ICON =
  "https://static-00.iconduck.com/assets.00/thumbs-down-icon-144x138-drilx3pg.png";
export const BLACK_UNLIKE =
  "https://static-00.iconduck.com/assets.00/thumbs-down-icon-144x144-eza6q4mg.png";
export const SHARE_ICON =
  "https://static-00.iconduck.com/assets.00/share-icon-144x130-8fw4avv2.png";
export const DOWNLOAD_ICON =
  "https://static-00.iconduck.com/assets.00/download-icon-112x144-fil7hk4y.png";
export const DOTS_ICON =
  "https://static-00.iconduck.com/assets.00/dots-3-icon-144x31-3ynrjmrx.png";

export const LEFT_ARROW =
  "https://static-00.iconduck.com/assets.00/chevron-right-arrow-icon-80x144-10jbr5jb.png";
export const RIGHT_ARROW =
  "https://static-00.iconduck.com/assets.00/nav-arrow-left-icon-79x144-dclck9vi.png";
export const SEND_ICON =
  "https://static-00.iconduck.com/assets.00/share-icon-144x144-4mvw7c20.png";

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

export const handleViewsCount = (views: string) => {
  return views.length > 9
    ? (+views / 1000000000 + "").slice(0, -8).replace(/\.0|\.$/, "") + "B"
    : views.length > 6
    ? (+views / 1000000 + "").slice(0, -5).replace(/\.0|\.$/, "") + "M"
    : views.length > 3
    ? (+views / 1000 + "").slice(0, -2).replace(/\.0|\.$/, "") + "K"
    : views;
};

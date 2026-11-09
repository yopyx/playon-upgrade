import { HistoryWithStatus, WatchingHistory } from "../../types/fetchedData";

const getHistoryAsync = async () => {
  const url =
    import.meta.env.VITE_ENVIRONMENT == "development"
      ? `/api/feed_history`
      : `https://playon-auth.runasp.net/api/feed_history`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      history: {} as WatchingHistory,
      status: response.status,
    } as HistoryWithStatus;
  }

  const history = (await response.json()) as WatchingHistory;
  return {
    history,
    status: response.status,
  } as HistoryWithStatus;
};

export default getHistoryAsync;

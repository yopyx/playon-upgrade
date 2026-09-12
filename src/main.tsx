import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./final.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { inject } from "@vercel/analytics";
import getCategoriesAsync from "./utils/functions/getCategoriesAsync.ts";
import getPopularVideosAsync from "./utils/functions/getPopularVideosAsync.ts";
import { VideoCardListWithStatus } from "./types/fetchedData.ts";
//inject();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // sensible default instead of 0 to prevent excessive refetching, but can be overridden in specific queries
    },
  },
});
queryClient.prefetchQuery({
  queryKey: ["categories"], // must exactly match the key used in SuggestionsButtons' useQuery
  queryFn: () => getCategoriesAsync(),
});
queryClient.prefetchInfiniteQuery<VideoCardListWithStatus>({
  queryKey: ["popular videos", "0"],
  initialPageParam: 1,
  queryFn: ({ pageParam }) => getPopularVideosAsync("0", pageParam as number),
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./final.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { noop } from "@tanstack/react-query";
// import { inject } from "@vercel/analytics";
// import getCategoriesAsync from "./utils/functions/getCategoriesAsync.ts";
// import getPopularVideosAsync from "./utils/functions/getPopularVideosAsync.ts";
// import { VideoCardListWithStatus } from "./types/fetchedData.ts";
//inject();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // sensible default instead of 0 to prevent excessive refetching, but can be overridden in specific queries
    },
  },
});

// await queryClient
//   .query({
//     queryKey: ["categories"], // must exactly match the key used in SuggestionsButtons' useQuery
//     queryFn: () => getCategoriesAsync(),
//     // Swallow errors here, because usually they will fetch again in `useQuery`
//   })
//   .catch(noop);
// await queryClient
//   .infiniteQuery({
//     queryKey: ["popular videos", "0"],
//     initialPageParam: 1,
//     queryFn: ({ pageParam }) => getPopularVideosAsync("0", pageParam as number),
//   })
//   .catch(noop);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

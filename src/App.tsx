import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { appStore, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { lazy, Suspense } from "react";
import CommentsShimmer from "./components/shimmer/CommentsShimmer";

const MainContainer = lazy(() => import("./components/MainContainer"));
const SearchResultsContainer = lazy(
  () => import("./components/SearchResultsContainer")
);
const WatchContainer = lazy(() => import("./components/WatchContainer"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<CommentsShimmer />}>
            <MainContainer />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/results",
        element: (
          <Suspense fallback={<CommentsShimmer />}>
            <SearchResultsContainer />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<CommentsShimmer />}>
            <WatchContainer />
          </Suspense>
        ),
        children: [],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;

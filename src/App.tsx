import { createBrowserRouter, RouterProvider } from "react-router";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { appStore, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { lazy, Suspense } from "react";
import SpinShimmer from "./components/shimmer/SpinShimmer";

const LandingPage = lazy(() => import("./components/LandingPage"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const SearchResultsContainer = lazy(
  () => import("./components/SearchResultsContainer"),
);
const WatchContainer = lazy(() => import("./components/WatchContainer"));
const History = lazy(() => import("./components/History"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SpinShimmer />}>
            <MainContainer />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<SpinShimmer />}>
            <LandingPage />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/results",
        element: (
          <Suspense fallback={<SpinShimmer />}>
            <SearchResultsContainer />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<SpinShimmer />}>
            <WatchContainer />
          </Suspense>
        ),
        children: [],
      },
      {
        path: "/history",
        element: (
          <Suspense fallback={<SpinShimmer />}>
            <History />
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

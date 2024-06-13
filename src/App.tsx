import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import SearchResultsContainer from "./components/SearchResultsContainer";
import WatchContainer from "./components/WatchContainer";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
        children: [],
      },
      {
        path: "/results",
        element: <SearchResultsContainer />,
        children: [],
      },
      {
        path: "/watch",
        element: <WatchContainer />,
        children: [],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

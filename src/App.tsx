import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import SearchResultsContainer from "./components/SearchResultsContainer";
import WatchContainer from "./components/WatchContainer";
import { Provider } from "react-redux";
import appStore from "./redux/store";

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
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;

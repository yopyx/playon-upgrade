import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import SearchResultsContainer from "./components/SearchResultsContainer";
import WatchContainer from "./components/WatchContainer";
import { Provider } from "react-redux";
import { appStore, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;

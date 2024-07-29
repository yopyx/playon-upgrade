import { useLocation } from "react-router-dom";

const SearchResultsContainer = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-wrap w-screen space-x-4 space-y-10">
      <div
        className={
          (pathname === "/watch" ? "w-[400px]" : "w-[1320px]") +
          " flex justify-center"
        }
      >
        <div
          className={
            (pathname === "/watch" ? "w-[450px]" : "w-[1000px]") +
            " flex flex-col space-y-4 my-4"
          }
        >
          {[]}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsContainer;

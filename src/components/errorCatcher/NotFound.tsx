import { useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full flex flex-col mx-auto">
      <img
        src="/notFoundIcon.png"
        alt="not found icon"
        className="w-[800px] object-cover mx-auto"
      />
      <div
        className={
          (pathname === "/watch" ? "-mt-28" : "-mt-52") +
          " flex flex-col mx-auto"
        }
      >
        <h2 className="text-xl mx-auto font-semibold">No results found</h2>
        <p className="mx-auto">Try different keywords or suggestions</p>
      </div>
    </div>
  );
};

export default NotFound;

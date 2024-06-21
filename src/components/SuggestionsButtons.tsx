import { useLocation } from "react-router-dom";
import { LEFT_ARROW, RIGHT_ARROW } from "../utils/constants";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import getCategories from "../utils/custom hooks/getCategories";

const SuggestionsButtons = () => {
  const { pathname } = useLocation();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div
      className={
        (pathname === "/watch" ? "" : "sticky top-14 ") +
        "w-[80vw] flex overflow-x-hidden z-30"
      }
    >
      <div className="w-full flex justify-between absolute">
        {
          <button className="bg-white bg-opacity-80 p-3 px-3.5 rounded-full z-10 hover:bg-stone-100">
            <img alt="LEFT_ARROW" src={LEFT_ARROW} className="w-1.5" />
          </button>
        }
        {
          <button className="bg-white bg-opacity-80 p-3 px-3.5 rounded-full z-50 hover:bg-stone-100">
            <img alt="RIGHT_ARROW" src={RIGHT_ARROW} className="w-1.5" />
          </button>
        }
      </div>
      <div className="flex space-x-2 px-10">
        <Button key={"All"} category={"All"} />
        <Button key={"Live Stream"} category={"Live Stream"} />
        {data?.map((c) => (
          <Button key={c.etag} category={c.snippet.title} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsButtons;

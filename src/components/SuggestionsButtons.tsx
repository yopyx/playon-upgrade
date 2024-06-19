import { useLocation } from "react-router-dom";
import { LEFT_ARROW, RIGHT_ARROW } from "../utils/constants";
import Button from "./Button";

const SuggestionsButtons = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={
        (pathname === "/watch" ? "" : "sticky top-14 ") +
        "w-full overflow-x-hidden z-20 bg-black"
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
        <Button category={"All"} />
        <Button category={"Live Stream"} />
      </div>
    </div>
  );
};

export default SuggestionsButtons;

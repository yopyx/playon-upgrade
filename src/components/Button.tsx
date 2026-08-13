import { useLocation } from "react-router-dom";
import {
  addCategoryDetails,
  addSelectedCategory,
} from "../redux/videoCategorySlice";
import { ButtonProps } from "../types/props";
import { useAppDispatch } from "../types/reduxHooks";
import { useUpdatedUi } from "../utils/custom hooks/useUpdatedUi";

const Button = ({ categoryData, title, clicked, setClicked }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const { lightTheme } = useUpdatedUi();
  const { pathname } = useLocation();
  return (
    <div
      className={`${
        clicked
          ? "bg-black text-white"
          : lightTheme
            ? "bg-stone-200 hover:bg-stone-300"
            : "dark-highlight-color text-stone-200 hover:bg-stone-200 hover:text-black"
      } px-3 py-2 font-semibold text-sm text-nowrap cursor-pointer rounded-lg z-20 border-2 border-yellow-600/75 mobile:button-mobile tablet-s:button-mobile 8k-r:text-lg`}
      onClick={() => {
        setClicked(title);
        if (pathname === "/") {
          dispatch(
            addCategoryDetails(categoryData || { id: "0", title: "All" }),
          );
        } else {
          dispatch(addSelectedCategory(title));
        }
        pathname !== "/watch" && window.scrollTo(0, 0);
      }}
    >
      {title}
    </div>
  );
};

export default Button;

import { useLocation } from "react-router-dom";
import { addSuggestedCategory } from "../redux/searchTextSlice";
import { addCategoryDetails } from "../redux/videoCategorySlice";
import { ButtonProps } from "../types/props";
import { useAppDispatch } from "../types/reduxHooks";

const Button = ({
  categoryData,
  title,
  clicked,
  setClicked,
  lightTheme,
}: ButtonProps) => {
  const dispatch = useAppDispatch();
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
        pathname === "/"
          ? dispatch(addCategoryDetails(categoryData))
          : dispatch(addSuggestedCategory(title));
      }}
    >
      {title}
    </div>
  );
};

export default Button;

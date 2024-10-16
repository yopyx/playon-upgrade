import { useLocation } from "react-router-dom";
import { addSuggestedCategory } from "../redux/searchTextSlice";
import { addCategoryDetails } from "../redux/videoCategorySlice";
import { ButtonProps } from "../types/props";
import { useAppDispatch } from "../types/reduxHooks";

const Button = ({ categoryData, title, clicked, setClicked }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  return (
    <div
      className={`${
        clicked ? "bg-black text-white" : "bg-stone-200 hover:bg-stone-300"
      } px-3 py-2 font-semibold text-sm text-nowrap cursor-pointer rounded-lg z-20`}
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

import { addCategoryDetails } from "../redux/videoCategorySlice";
import { ButtonProps } from "../types/props";
import { useAppDispatch } from "../types/reduxHooks";

const Button = ({ categoryData, clicked, setClicked }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const { title } = categoryData.snippet;
  return (
    <div
      className={`${
        clicked ? "bg-black text-white" : "bg-stone-200 hover:bg-stone-300"
      } px-3 py-2 font-semibold text-sm text-nowrap cursor-pointer rounded-lg`}
      onClick={() => {
        setClicked(title);
        dispatch(addCategoryDetails(categoryData));
      }}
    >
      {title}
    </div>
  );
};

export default Button;

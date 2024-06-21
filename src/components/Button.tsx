import { addCategory } from "../redux/videoCategorySlice";
import { ButtonProps } from "../types/props";
import { useAppDispatch } from "../types/reduxHooks";

const Button = ({ category, clicked, setClicked }: ButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        clicked ? "bg-black text-white" : "bg-stone-200 hover:bg-stone-300"
      } px-3 py-2 font-semibold text-sm text-nowrap cursor-pointer rounded-lg z-20`}
      onClick={() => {
        setClicked(category);
        dispatch(addCategory(category));
      }}
    >
      {category}
    </div>
  );
};

export default Button;

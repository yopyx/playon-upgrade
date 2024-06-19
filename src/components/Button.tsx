type ButtonProps = {
  category: string;
};

const Button = ({ category }: ButtonProps) => {
  return (
    <div className="bg-stone-200 hover:bg-stone-300 w-max h-max px-3 py-2 font-semibold text-sm cursor-pointer rounded-lg">
      {category}
    </div>
  );
};

export default Button;

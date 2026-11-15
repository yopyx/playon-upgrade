import { useLocation } from "react-router";

const SuggestionButtonsShimmer = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex gap-x-3 sticky top-20 mb-10">
      {[...Array(pathname === "/watch" ? 4 : 11)].map((_, i) => (
        <div
          key={i}
          className="px-3 py-2 font-semibold text-sm text-transparent text-nowrap cursor-pointer rounded-lg bg-stone-200/30"
        >
          qwertyuiop
        </div>
      ))}
    </div>
  );
};

export default SuggestionButtonsShimmer;

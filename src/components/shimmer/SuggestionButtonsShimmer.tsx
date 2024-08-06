const SuggestionButtonsShimmer = () => {
  return (
    <div className="flex gap-x-3 sticky top-20 mb-12 justify-center bg-white">
      {[...Array(11)].map((_, i) => (
        <div
          key={i}
          className="px-3 py-2 font-semibold text-sm text-stone-200 text-nowrap cursor-pointer rounded-lg bg-stone-200"
        >
          qwertyuiop
        </div>
      ))}
    </div>
  );
};

export default SuggestionButtonsShimmer;

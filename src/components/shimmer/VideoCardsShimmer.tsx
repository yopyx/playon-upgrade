const VideoCardsShimmer = ({ len }: { len: number }) => {
  return (
    <div className="flex flex-wrap w-screen space-x-4 space-y-10">
      {[...Array(len)].map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="w-[394px] h-[222px] bg-stone-300 rounded-xl"></div>
          <div className="flex mt-3 space-x-3">
            <div className="bg-stone-300 rounded-full w-10 h-10"></div>
            <div className="flex flex-col space-y-2">
              <div className="w-[300px] h-4 bg-stone-300"></div>
              <div className="w-[260px] h-4 bg-stone-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCardsShimmer;

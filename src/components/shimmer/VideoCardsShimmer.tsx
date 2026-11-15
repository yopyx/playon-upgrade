const VideoCardsShimmer = ({
  collapsedSideBar,
}: {
  collapsedSideBar: boolean;
}) => {
  const len = collapsedSideBar ? 8 : 6;
  return (
    <div className="flex flex-wrap gap-4">
      {[...Array(len)].map((_, i) => (
        <div key={i} className="flex flex-col">
          <div
            className={`${
              collapsedSideBar ? "w-[330px] h-[200px]" : "w-[394px] h-[222px]"
            } bg-stone-200/30 rounded-xl mobile:w-[330px] mobile:h-[200px]`}
          ></div>
          <div className="flex mt-3 gap-x-3">
            <div className="bg-stone-200/30 rounded-full w-10 h-10"></div>
            <div className="flex flex-col gap-y-2">
              <div
                className={`${
                  collapsedSideBar ? "w-[260px]" : "w-[300px] mobile:w-[260px]"
                } h-4 bg-stone-200/30`}
              ></div>
              <div
                className={`${
                  collapsedSideBar ? "w-[200px]" : "w-[260px] mobile:w-[200px]"
                } h-4 bg-stone-200/30`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCardsShimmer;

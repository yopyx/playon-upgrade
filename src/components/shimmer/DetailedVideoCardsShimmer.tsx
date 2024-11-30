import { useLocation } from "react-router-dom";

const DetailedVideoCardsShimmer = ({ len }: { len: number }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-wrap gap-4 w-full justify-center">
      {[...Array(len)].map((_, i) => (
        <div
          key={i}
          className={`flex gap-x-4${
            pathname === "/results" ? " sub4:-ml-20" : ""
          }`}
        >
          <div
            className={`${
              pathname === "/watch"
                ? "h-[115px] w-[205px]"
                : "h-[210px] w-[375px]"
            } bg-stone-200/30 rounded-xl tablet-r:video-card-tablet-r mobile:video-card-mobile`}
          ></div>
          <div className="flex flex-col mt-3 gap-3 sub4:hidden">
            <div
              className={`${
                pathname === "/watch" ? "w-[200px]" : "w-[560px]"
              } h-6 bg-stone-200/30`}
            ></div>
            <div className="bg-stone-300/30 rounded-full w-7 h-7"></div>
            <div className="flex flex-col gap-y-2">
              <div
                className={`${
                  pathname === "/watch" ? "w-[200px]" : "w-[300px]"
                } h-4 bg-stone-200/30`}
              ></div>
              <div
                className={`${
                  pathname === "/watch" ? "w-[180px]" : "w-[260px]"
                } h-4 bg-stone-200/30`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedVideoCardsShimmer;

import { useLocation } from "react-router-dom";

const DetailedVideoCardsShimmer = ({ len }: { len: number }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-wrap ml-32 gap-4">
      {[...Array(len)].map((_, i) => (
        <div key={i} className="flex gap-x-4">
          <div
            className={`${
              pathname === "/watch"
                ? "h-[115px] w-[205px]"
                : "h-[210px] w-[375px]"
            } bg-stone-200 rounded-xl`}
          ></div>
          <div className="flex flex-col mt-3 gap-3">
            <div
              className={`${
                pathname === "/watch" ? "w-[300px]" : "w-[560px]"
              } h-6 bg-stone-200`}
            ></div>
            <div className="bg-stone-300 rounded-full w-7 h-7"></div>
            <div className="flex flex-col gap-y-2">
              <div
                className={`${
                  pathname === "/watch" ? "w-[260px]" : "w-[300px]"
                } h-4 bg-stone-200`}
              ></div>
              <div
                className={`${
                  pathname === "/watch" ? "w-[200px]" : "w-[260px]"
                } h-4 bg-stone-200`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedVideoCardsShimmer;

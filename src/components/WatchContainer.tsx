import { useLocation } from "react-router-dom";

const WatchContainer = () => {
  const { search } = useLocation();

  return (
    <div className="flex justify-center space-x-7">
      <div className="mt-10 flex flex-col space-y-3">
        <iframe
          width="950"
          height="535"
          src={`https://www.youtube.com/embed/${search.slice(3)}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WatchContainer;

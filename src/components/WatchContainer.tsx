import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import getVideoData from "../utils/custom hooks/getVideoData";

const WatchContainer = () => {
  const { search } = useLocation();
  const videoId = search.slice(3);
  const { data, status, error } = useQuery({
    queryKey: ["videoData", videoId],
    queryFn: () => getVideoData(videoId),
  });
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex justify-center space-x-7">
      <div className="mt-20 ml-20 flex flex-col space-y-3">
        <iframe
          width="950"
          height="535"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-2xl"
        ></iframe>
      </div>
    </div>
  );
};

export default WatchContainer;

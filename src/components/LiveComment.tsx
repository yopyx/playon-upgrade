import { LiveCommentProps } from "../types/props";
import { CORS } from "../utils/constants";

const LiveComment = ({ info }: LiveCommentProps) => {
  const { displayMessage } = info.snippet;
  const { displayName, profileImageUrl } = info.authorDetails;
  return (
    <div className="flex space-x-2 text-xs mt-2">
      <img
        alt={displayName}
        referrerPolicy="no-referrer"
        src={CORS + encodeURIComponent(profileImageUrl)}
        className="h-6 w-6 rounded-full bg-black"
      />
      <h5 className="">
        <span className="text-stone-400">{displayName} </span>
        {displayMessage}
      </h5>
    </div>
  );
};

export default LiveComment;

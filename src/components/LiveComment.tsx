import { LiveCommentProps } from "../types/props";

const LiveComment = ({ info, lightTheme }: LiveCommentProps) => {
  const { displayMessage, displayName, profileImageUrl } = info;
  return (
    <div className="flex space-x-2 text-xs mt-2">
      <img
        alt={displayName}
        referrerPolicy="no-referrer"
        src={profileImageUrl}
        className="h-6 w-6 rounded-full bg-black"
      />
      <h5 className="">
        <span className={`${lightTheme ? "text-stone-600" : "text-stone-400"}`}>
          {displayName}{" "}
        </span>
        {displayMessage}
      </h5>
    </div>
  );
};

export default LiveComment;

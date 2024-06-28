import { Category, VideoDetails } from "./fetchedData";

export type ButtonProps = {
  categoryData: Category;
  clicked: boolean;
  setClicked: (state: string) => void;
};

export type VideoCardProps = { info: VideoDetails; imgUrl: string | undefined };

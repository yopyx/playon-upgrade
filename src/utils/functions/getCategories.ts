import { Category } from "../../types/fetchedData";
import { CORS, YT_VID_CATEG_API } from "../constants";

const getCategories = async (apiKey: string) => {
  const url = CORS + encodeURIComponent(YT_VID_CATEG_API(apiKey));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("http error!");
  }
  const categories = await response.json();
  return categories.items as Category[];
};
export default getCategories;

import { Category, CategoryListWithStatus } from "../../types/fetchedData";
// https://localhost:7117/resources_api/video_categories
// Here the domain was omitted because of the proxy configuration in vite.config.ts
const getCategoriesAsync = async () => {
  const url =
    import.meta.env.VITE_ENVIRONMENT == "development"
      ? `/api/video_categories`
      : `https://playon-auth.runasp.net/api/video_categories`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status !== 200) {
    return {
      categories: [],
      status: response.status,
    } as CategoryListWithStatus;
  }
  const data = await response.json();
  return {
    categories: data as Category[],
    status: response.status,
  } as CategoryListWithStatus;
};
export default getCategoriesAsync;

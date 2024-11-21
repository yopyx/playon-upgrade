import { Category } from "../../types/fetchedData";

const getCategories = async (apiKey: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/categories?apiKey=${apiKey}`
      : `http://localhost:3000/categories?apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("http error!");
  }
  const data = await response.json();
  return data.items as Category[];
};
export default getCategories;

import { ChannelDetails } from "../../types/fetchedData";
const getChannelData = async (channelIds: string[], apiKey: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://play0n.vercel.app/api/channels?channelIds=${channelIds.join(
          "%2C"
        )}&apiKey=${apiKey}`
      : `http://localhost:3000/channels?channelIds=${channelIds.join(
          "%2C"
        )}&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.items as ChannelDetails[];
};
export default getChannelData;

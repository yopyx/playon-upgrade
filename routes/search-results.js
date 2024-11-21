import axios from "axios";
import express from "express";
const searchResultsRouter = express.Router();

searchResultsRouter.get("/search-results", async (req, res) => {
  const { nextToken, searchText, apiKey } = req.query;
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25${
        nextToken ? "&pageToken=" + nextToken : ""
      }&q=${searchText}&key=${apiKey}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error submitting data:",
      error.message,
      error.response ? error.response.data : ""
    );
    res.status(500).send("Error submitting data");
  }
});
export default searchResultsRouter;

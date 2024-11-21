//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
//import { createServer } from "vite";
import cors from "cors";
import categoriesRouter from "./routes/categories.js";
import channelsRouter from "./routes/channels.js";
import commentsRouter from "./routes/comments.js";
import liveChatRouter from "./routes/live-chat.js";
import popularVideosRouter from "./routes/popular.js";
import searchResultsRouter from "./routes/search-results.js";
import searchSuggestionsRouter from "./routes/search-suggest.js";
import videoListRouter from "./routes/video-list.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", categoriesRouter);
app.use("/", channelsRouter);
app.use("/", commentsRouter);
app.use("/", liveChatRouter);
app.use("/", popularVideosRouter);
app.use("/", searchResultsRouter);
app.use("/", searchSuggestionsRouter);
app.use("/", videoListRouter);

app.listen(3000);

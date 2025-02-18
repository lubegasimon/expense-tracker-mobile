import express from "express";
import cookieParser from "cookie-parser";
import app from "./server";
import { sessionManager } from "./middleware/session";
import { logger } from "./middleware/logger";
import handleError from "./middleware/errorHandler";
import trimRequestBodyContent from "./middleware/trimReqBodyContent";
import routers from "./routers";

const port = 3000;

app.use(cookieParser());
app.use(sessionManager);
app.use(logger);
app.use(express.json());
app.use(trimRequestBodyContent);
app.use(express.urlencoded({ extended: true }));

app.use(routers);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n`);
});

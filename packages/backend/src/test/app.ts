import express from "express";
import handleError from "../middleware/errorHandler";
import trimRequestBodyContent from "../middleware/trimReqBodyContent";
import routers from "../routers";

const app = express();
app.use(express.json());
app.use(trimRequestBodyContent);

app.use(routers);
app.use(handleError);

/* exports express app for the tests */
export default app;

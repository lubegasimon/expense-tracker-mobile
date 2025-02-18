import express from "express";
import handleError from "../middleware/errorHandler";
import trimRequestBody from "../middleware/trimRequestBody";
import routers from "../routers";

const app = express();
app.use(express.json());
app.use(trimRequestBody);

app.use(routers);
app.use(handleError);

/* exports express app for the tests */
export default app;

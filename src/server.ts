import app from "./app";
import indexRouter from "./route/index";

const port: number = 3000;

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

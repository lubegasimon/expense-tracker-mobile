import app from "./app";
import indexRouter from "./route/index";
import signupRouter from "./route/signup";

const port: number = 3000;

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

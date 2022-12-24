import app from "./api/app.js";

// port 8080
const port = 8080;
app.listen(8080, () => {
  console.log(`server running at ${port}`);
});

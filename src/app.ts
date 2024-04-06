const express = require("express");
const config  = require("./envconfig");

const mainRouter = require("./apis");
const app = express();

app.use("/", mainRouter.routing());
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

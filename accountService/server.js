require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

// For middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT || 3002;

app.use("/api/v1/auth", require("./routes/auth"));

app.use("/api/v1/dashboard", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});

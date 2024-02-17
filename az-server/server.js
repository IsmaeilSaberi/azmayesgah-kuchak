const express = require("express");
const app = express();

// importing installed packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// importing security packages
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// using middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to Aze Kuchak API");
});

// user Router
const UserRoutes = require("./routes/UserRoutes.js");
app.use("/user", UserRoutes);

// experiment Router
const ExperimentRoutes = require("./routes/ExperimentRoutes.js");
app.use("/experiment", ExperimentRoutes);

// post Router
const PostRoutes = require("./routes/PostRoutes.js");
app.use("/post", PostRoutes);

// rule Router
const RuleRoutes = require("./routes/RuleRoutes.js");
app.use("/rule", RuleRoutes);

// connect to mongoDB
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 27017;

mongoose
  .connect(CONNECTION_URL)
  .then((d) => {
    console.log("server connected to db!");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

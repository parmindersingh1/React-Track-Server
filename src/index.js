require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

//Set up default mongoose connection
const mongoUri = "mongodb://127.0.0.1/track-server";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//Get the default connection
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on("error", () => {
  console.log("Error Connecting to mongo instance", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

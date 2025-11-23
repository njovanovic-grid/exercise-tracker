const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const usersRouter = require("./routes/user.router");
const exerciseRouter = require("./routes/exercise.router");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.use("/api/users/:_id", exerciseRouter);
app.use("/api/users", usersRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.use("/", (req, res) => {
  res.status(404).send("Page not found");
});

//DataBase Connection
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

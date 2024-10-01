const express = require("express");
const passport = require("passport");
require("./middleware/passport");
const localStrategy = require("./middleware/passport");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
connectDb();

app.use(passport.initialize());

passport.use(localStrategy);

app.use(express.json());

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.json({ message: "Signed in successfully", user: req.user });
  }
);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

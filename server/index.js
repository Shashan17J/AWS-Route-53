const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dnsRoutes = require("./routes/route53");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config();

database.connect();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/v1/route53", dnsRoutes);
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running..",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

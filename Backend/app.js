require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
app.use(cookie());
app.use(express.json());
app.use('/avatars', express.static('public/avatars'));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const Db = require("./config/database");
Db.connectToDatabase();

const PORT = process.env.PORT || 4000;

const UserRoutes = require("./Routes/auth.routes");
const TodoRoutes = require("./Routes/todo.Routes");

app.use("/api/auth", UserRoutes);
app.use("/api/todo", TodoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

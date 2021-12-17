const express = require("express");
const server = require("./routes/server.js");
const admin = require("./routes/admin.js");
const PORT = process.env.PORT || 4000;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("./public"));
app.use("/", server);
app.use("/admin", admin);

app.listen(PORT);

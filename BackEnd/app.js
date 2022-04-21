const express = require("express");
const path = require("path");
const auth = require("./middleware/auth");
const app = express();
const dB = require("./models");

const authRoutes    = require("./routes/auth")
const userRoutes    = require("./routes/user")
const messageRoutes = require("./routes/message")
const commentRoutes = require("./routes/comment")

app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/messages", auth, messageRoutes);
app.use("/api/comments", auth, commentRoutes);

module.exports = app
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cp = require('cookie-parser');
const apiRouter = require("./api/api-router.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(cp());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.json({ message: "Backend here." });
});

module.exports = server;
 

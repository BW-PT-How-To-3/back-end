const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cp = require('cookie-parser');
const apiRouter = require("./api/api_r");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(cp());


server.use("/", (req, res) => {
  res.json({ Message: "Welcome to the HowTo API!"})
})

server.use("/api", apiRouter);


module.exports = server;
 

// it's recommended to load configuration for .env as early as possible
// require("dotenv").config(); // add this line as the first thing to run1

const server = require("./server");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

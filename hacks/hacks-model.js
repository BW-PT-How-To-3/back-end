const db = require("../data/dbConfig");
module.exports = {
  findHacks,
  addHacks,
};

function findHacks() {
  return db("hacks");
}

function addHacks(hacks) {
  return db("project").insert(hacks);
}

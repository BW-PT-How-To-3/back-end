const db = require("../data/dbConfig");
module.exports = {
  findHacks,
  addHacks,
  findById,
  findBy
};

function findHacks() {
  return db("hacks").select("id", "user_id");
}

function addHacks(hacks) {
  const [id] = await db("hacks").insert(hack);
  return findById(id);
}

function findById(id) {
  return db("hacks").select("id", "user_id").where({ id }).first();
}

function findBy(filter) {
  return db("hacks").select("id", "username", "password").where(filter);
}
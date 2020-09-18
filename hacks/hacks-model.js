const db = require("../data/dbConfig");
module.exports = {
  findHacks,
  addHacks,
  findById,
  findBy,
};

//functtion to find hacks returning db of hacks finding with id and user_id
function findHacks() {
  return db("hacks").select("id", "user_id");
}

//async function to add hacks , set variable id to await hacks db info and then insert hacks, find by using id
async function addHacks(hacks) {
  const [id] = await db("hacks").insert(hacks);
  return findById(id);
}

//function to find by id, return hacks using id and user_id, located in variable id
function findById(id) {
  return db("hacks").select("id", "user_id").where({ id }).first();
}

//find by filter and return hacks db using is, usrname, password to be authenticated and filtered which hacks
function findBy(filter) {
  return db("hacks").select("id", "username", "password").where(filter);
}

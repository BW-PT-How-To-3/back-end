const db = require("../data/dbconfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

//async function to add user. set id to await users db and then insert new user by id. return it by using find id
async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

//function to find users, return the users db and select it by the id and username
function find() {
  return db("users").select("id", "username");
}

//function findby to find user using filter and return the users db selecting by id, username, and password.
function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

//function to findbyid to use id and then return users db selecting it by id and username.
function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

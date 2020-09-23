const db = require("../data/dbconfig");
const uuid = require("uuid");

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}
async function addUser(user) {
  const id = uuid.v4();
  await db("users").insert({ ...user, id });
  return findById(id);
}

// function addUser(user) {
//   db('users').insert(user)
//   .then(ids => {
//     return findById(ids[0]);
//   });
// }

function allUsers() {
  return db("users");
}

function findUser(filter) {
  return db("users").select("id", "username", "password", "role").where(filter);
}

function updateUser(changes,  id) {
  
  return db("users").update(changes).where({ id });
}


function removeUser(id){
  return db('users')
  .where('id', id)
  .del()
  .then(response => (!response ? null : response))
}

module.exports = {
  findById,
  addUser,
  allUsers,
  findUser,
  updateUser,
  removeUser
};
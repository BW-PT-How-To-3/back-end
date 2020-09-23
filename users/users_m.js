const db = require("../data/dbconfig");
const uuid = require("uuid");

//-----------------------------------------------------------------------------
/*  Function finds users by their user id  */
//-----------------------------------------------------------------------------
function findById(id) {
  return db("users")
  .select("id", "username")
  .where({ id })
  .first();
}

//-----------------------------------------------------------------------------
/*  Function inserts user into the database with a generated uuid  */
//-----------------------------------------------------------------------------
async function addUser(user) {
  const id = uuid.v4();
  await db("users")
  .insert({ ...user, id });
  return findById(id);
}

//-----------------------------------------------------------------------------
/*  Function pulls all user accounts from database  */
//-----------------------------------------------------------------------------
function allUsers() {
  return db("users");
}

//-----------------------------------------------------------------------------
/*  Function finds users filtered by requested data  */
//-----------------------------------------------------------------------------
function findUser(filter) {
  return db("users")
  .select("id", "username", "password", "role")
  .where(filter);
}

//-----------------------------------------------------------------------------
/*  Function updates the users account information  */
//-----------------------------------------------------------------------------
function updateUser(changes,  id) {
  return db("users")
  .update(changes)
  .where({ id });
}

//-----------------------------------------------------------------------------
/*  Function removes user from database  */
//-----------------------------------------------------------------------------
function removeUser(id){
  return db('users')
  .where('id', id)
  .del()
  .then(response => (!response ? null : response))
}

//-----------------------------------------------------------------------------
/*  Exporting all modules  */
//-----------------------------------------------------------------------------
module.exports = {
  findById,
  addUser,
  allUsers,
  findUser,
  updateUser,
  removeUser
};
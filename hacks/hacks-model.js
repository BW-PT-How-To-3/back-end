/*
 * FileName: pm.js
 * Title: Posts Model File
 */
//-----------------------------------------------------------------------------
/*  dependencies  */
const db = require("../data/dbconfig");
//-----------------------------------------------------------------------------

/*  Posts EndPoint Funchtions  */

function addPost(post) {
  return db("posts").insert(post);
}

function updatePost(changes, id) {
  return db("posts").update(changes).where({ id });
}

function deletePost(id) {
  return db("hacks")
    .where("id", id)
    .del()
    .then((response) => (!response ? null : response));
}

function findAllPosts() {
  return db("posts");
}

function findPostById(id) {
  return db("posts").where("id ", id);
}

module.exports = {
  addPost,
  updatePost,
  deletePost,
  findAllPosts,
  findPostById,
};


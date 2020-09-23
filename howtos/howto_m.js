const db = require('../data/dbconfig')

//-----------------------------------------------------------------------------
/*  function pulls all howtos from database  */
//-----------------------------------------------------------------------------
function getAllHowtos() {
    return db('howtos')
}

//-----------------------------------------------------------------------------
/*  Function gets Howto post by post id  */
//-----------------------------------------------------------------------------
function getHowtoById(id) {
    return db('howtos')
        .where('id', id)
}

//-----------------------------------------------------------------------------
/*  Function adds a howto post  */
//-----------------------------------------------------------------------------
function addHowto(howto) {
    return db("howtos")
        .insert(howto)
}

//-----------------------------------------------------------------------------
/*  Updates Howto post  */
//-----------------------------------------------------------------------------
function updateHowto(changes, id) {
    return db('howtos')
        .update(changes)
        .where({ id })
}

//-----------------------------------------------------------------------------
/*  Removes howto post from database  */
//-----------------------------------------------------------------------------
function removeHowto(id){
    return db('howtos')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}

//-----------------------------------------------------------------------------
/*  Exporting All Modules  */
//-----------------------------------------------------------------------------
module.exports = {
    getAllHowtos,
    getHowtoById,
    addHowto,
    updateHowto,
    removeHowto
}
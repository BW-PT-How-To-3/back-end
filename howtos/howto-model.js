const db = require('../data/dbconfig')

module.exports = {
    getAllHowtos,
    getHowtoById,
    addHowto,
    updateHowto,
    removeHowto
}

function getAllHowtos() {
    return db('howtos')
}

function getHowtoById(id) {
    return db('howtos')
        .where('id', id)
    }

function addHowto(howto) {
    return db("howtos")
        .insert(howto)
}

function updateHowto(changes, id) {
    return db('howtos')
        .update(changes)
        .where({ id })
}

function removeHowto(id){
    return db('howtos')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}
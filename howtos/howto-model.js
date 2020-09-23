const db = require('../data/dbconfig')

module.exports = {
    getAllHowtos,
    getHowtoById,
    addHowto,
    updateHowto,
    removeHowto
}

function getAllHowtos() {
    return db('Howtos')
}

function getHowtoById(id) {
    return db('Howtos')
        .where('id', id)
    }

function addHowto(howto) {
    return db("Howtos")
        .insert(howto)
}

function updateHowto(changes, id) {
    return db('Howtos')
        .update(changes)
        .where({ id })
}

function removeHowto(id){
    return db('Howtos')
    .where('id', id)
    .del()
    .then(response => (!response ? null : response))
}
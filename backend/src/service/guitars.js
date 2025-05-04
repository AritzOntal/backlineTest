const knex = require('knex');
const { getAge, getCategory } = require('../utils')


const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'backline.db'
    },
    useNullAsDefault: true
});

//ACTIVAR FOREIGN KEYS DE SQILTE

db.raw('PRAGMA foreign_keys = ON')
    .then(() => {
        console.log('Claves foráneas activadas en SQLite');
    })
    .catch(err => {
        console.error('Error activando claves foráneas:', err);
    });

module.exports = db;

const findGuitar = (async (idGuitar) => {
    const result = await db('guitars').where({ id_guitar: idGuitar }).first();
    return result;
});

const findGuitars = (async () => {
    const result = await db('guitars').select('*');
    return result;
});

const registerGuitar = (async (model, year, condition) => {

    const age = getAge(year);
    const category = getCategory(age);

    const returning = await db('guitars').insert({
        model: model,
        year: year,
        condition: condition,
        age: age,
        category: category
    }).returning('id_guitar');

    //TODO AÑADIR DATOS AL RETURNING
    const result = {
        id: returning[0].id_guitar,
        age: age,
        category: category
    }
    return result;
});



const modifyGuitar = (async (model, year, condition) => {

});

const removeGuitar = (async (idGuitar) => {

});

module.exports = {
    findGuitar,
    findGuitars,
    registerGuitar,
    modifyGuitar,
    removeGuitar
}
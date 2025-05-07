const knex = require('knex');
const { getAge, getCategory } = require('../utils')
const { config } = require('../config/configuration');



const db = knex({
    client: 'mysql',
    connection: {
        host: config.db.host,
        password: config.db.password,
        port: config.db.port,
        user: config.db.user,
        database: config.db.database
    },
    useNullAsDefault: true
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
    });

    const result = {
        id: returning[0],
        age: age,
        category: category
    }
    return result;
});


const modifyGuitar = (async (id, model, year, condition) => {
    const updated = await db('guitars').where({ id_guitar: id }).update({
        model: model,
        year: year,
        condition: condition
    });

    if (updated === 0) return null;
    
    const result = {
        id,
        model,
        year,
        condition
    }
    return result;
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
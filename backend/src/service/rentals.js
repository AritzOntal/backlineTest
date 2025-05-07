const knex = require('knex');
const { } = require('../utils')
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



const findRentals = (async () => {
    const result = await db('rentals').select('*');
    return result;
});

const findRental = (async (idRental) => {
    const result = await db('rentals').where({ _rental: idRental }).first();
    return result;
});

const registerRental = (async (id_guitar, name, return_date) => {
    const returning = await db('rentals').insert({
        id_guitar: id_guitar,
        name: name,
        return_date: return_date
    });

    const result = {
        id: returning[0]
    }
    return result;

});

const modifyRental = (async (idRental, idGuitar, returnDate) => {
    const returning = await db('rentals').where({ id_guitar_rental: idRental }).update({
        id_guitar: idGuitar,
        return_date: returnDate
    });

    const result = {
        idRental: returning[0],
    }

    return result;
});


module.exports = {
    findRental,
    findRentals,
    registerRental,
    modifyRental,
    removeRental
}
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
    const result = await db('rentals').select(
        'id_guitar_rental',
        'id_guitar',
        'name',
        db.raw('DATE_FORMAT(date, "%Y-%m-%d") AS date'),
        db.raw('DATE_FORMAT(return_date, "%Y-%m-%d") AS return_date')
    );
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

    const result = await db ('rentals')
        .where({ id_guitar_rental: returning[0] })
        .first();
        
    return result
    
});



const modifyRental = async (idRental, idGuitar, returnDate) => {
    const updated = await db('rentals')
        .where({ id_guitar_rental: idRental })
        .update({
            id_guitar: idGuitar,
            return_date: returnDate
        });

    if (updated === 0) return null; // no se actualizó nada

    const result = await db('rentals')
        .select(
            'id_guitar_rental',
            'id_guitar',
            'name',
            db.raw('DATE_FORMAT(date, "%Y-%m-%d") as date'),
            db.raw('DATE_FORMAT(return_date, "%Y-%m-%d") as return_date')
        )
        .where({ id_guitar_rental: idRental })
        .first();

    return result;
};

// TODO REMOVE RENTAL


module.exports = {
    findRental,
    findRentals,
    registerRental,
    modifyRental,
}
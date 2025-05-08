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


const findRental = async (idRental) => {
    return await db('rentals')
        .where({ id_guitar_rental: idRental })
        .select(
            'id_guitar_rental',
            'id_guitar',
            'name',
            db.raw('DATE_FORMAT(date, "%Y-%m-%d") AS date'),
            db.raw('DATE_FORMAT(return_date, "%Y-%m-%d") AS return_date')
        )
        .first();
};


const registerRental = (async (id_guitar, name, return_date) => {
    const returning = await db('rentals').insert({
        id_guitar: id_guitar,
        name: name,
        return_date: return_date
    });

    const result = await db('rentals')
        .where({ id_guitar_rental: returning[0] })
        .select(
            'id_guitar_rental',
            'id_guitar',
            'name',
            db.raw('DATE_FORMAT(date, "%Y-%m-%d") AS date'),
            db.raw('DATE_FORMAT(return_date, "%Y-%m-%d") AS return_date')
        )
        .first();

    return result;
});



const modifyRental = async (idRental, idGuitar, returnDate) => {
    const updated = await db('rentals')
        .where({ id_guitar_rental: idRental })
        .update({
            id_guitar: idGuitar,
            return_date: returnDate
        });

    if (updated === 0) return null;

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

const activeRentals = (async (guitarId) => {
    const result = await db('rentals').where({ id_guitar: guitarId }).count('id_guitar_rental as count');

    return Number(result[0].count);
});


const removeRental = (async (idRental) => {

    const deleted = await db('rentals').where({ id_guitar_rental: idRental }).del();

    return deleted;
});


module.exports = {
    findRental,
    findRentals,
    registerRental,
    modifyRental,
    activeRentals,
    removeRental
}
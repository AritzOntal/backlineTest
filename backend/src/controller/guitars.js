const { findGuitars, registerGuitar, findGuitar, modifyGuitar, removeGuitar, countDistinct } = require("../service/guitars");
const { activeRentals } = require("../service/rentals");
const { guitarValidationData, isNewGuitar } = require("../utils");


const getGuitars = (async (req, res) => {
    const guitarList = await findGuitars();
    //EJEMPLO: TUNEAR LA RESPUESTA DE LA BASE DE DATOS

    // guitarList.forEach((item) => {
    //     item.modelito = item.model,
    //     delete item.model
    // });
    res.status(200).json(guitarList);
});



const getGuitar = (async (req, res) => {

    try {

        const id = req.params.guitarId;
        const guitar = await findGuitar(id);

        if (guitar === undefined) {
            res.status(404).json({
                status: 'not-found',
                message: 'guitar not found'
            });
            return;
        }

        res.status(200).json({
            id_guitar: guitar.id_guitar,
            model: guitar.model,
            year: guitar.year,
            condition: guitar.condition,
            age: guitar.age,
            category: guitar.category
        });

    } catch (error) {
        console.error('❌ Error al buscar la guitarra:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


const postGuitar = (async (req, res) => {

    const model = req.body.model;
    const condition = req.body.condition;
    const year = req.body.year;

    const validationError = guitarValidationData(model, year, condition);

    if (validationError !== true) {
        return res.status(400).json({
            status: 'bad-request',
            message: validationError
        })
    }

    const newGuitar = isNewGuitar(condition);

    if (newGuitar !== false) {
        return res.status(400).json({
            status: 'bad-request',
            message: newGuitar
        })
    }

    try {
        //LLAMANDO AL SERVICE
        const result = await registerGuitar(model, year, condition);
        return res.status(201).json({
            //DEVUELVE TODA LA INFO DE LA GUITARRA INSERTADA CON SU ID.
            id_guitar: result.id,
            model: result.model,
            year: result.year,
            condition: result.condition,
            age: result.age,
            category: result.category
        });

    } catch (error) {

        if (error.message.includes('FOREIGN KEY constraint failed')) {
            return res.status(400).json({ error: 'La guitarra ya existe o hay un problema con la clave foránea' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


const putGuitar = (async (req, res) => {

    const model = req.body.model;
    const year = parseInt(req.body.year, 10);
    const condition = req.body.condition;
    const id = parseInt(req.params.guitarId, 10);

    const validationError = guitarValidationData(model, year, condition);

    if (validationError !== true) {
        return res.status(400).json({
            status: 'bad-request',
            message: validationError
        })
    }

    const updateGuitar = await modifyGuitar(id, model, year, condition);

    if (!updateGuitar) {
        return res.status(404).json({
            status: 'not found',
            message: 'Guitar not found or could not be updated'
        });
    }

    res.status(200).json(updateGuitar);
});



const deleteGuitar = (async (req, res) => {
    try {

        const guitarId = parseInt(req.params.guitarId);

        if (!Number.isInteger(guitarId)) {
            return res.status(400).json({
                status: 'bad request',
                message: 'guitarId is not a valid number'
            });
        }
    
        const active = await activeRentals(guitarId);

        if (active > 0) {
            return res.status(409).json({
                status: 'conflict',
                message: 'Cannot delete guitar: it is currently used in rentals.'
            });
        }

        const removed = await removeGuitar(guitarId);

        if (!removed) {
            return res.status(404).json({
                status: 'not found',
                message: 'guitar not found'
            })
        }

        return res.status(204).end();

    } catch (error) {
        console.error('Error in deleteGuitar:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });

    }
});

module.exports = {
    getGuitar,
    getGuitars,
    postGuitar,
    putGuitar,
    deleteGuitar
}

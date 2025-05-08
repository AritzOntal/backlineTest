const { findRentals, registerRental, findRental, modifyRental, removeRental } = require("../service/rentals");
const { rentalValidationData, getRentalDuration } = require("../utilsRentals");



const getRentals = (async (req, res) => {
    const rentalList = await findRentals();

    res.status(200).json(rentalList);
});


const getRental = (async (req, res) => {

    try {

        const id = req.params.rentalId;
        const rental = await findRental(id);

        if (rental === undefined) {
            res.status(404).json({
                status: 'not-found',
                message: 'rental not found'
            });
            return;
        }

        const rentalDuration = getRentalDuration(rental.date)

        res.status(200).json({
            id_guitar_rental: rental.id_guitar_rental,
            id_guitar: rental.id_guitar,
            name: rental.name,
            date: rental.date,
            return_date: rental.return_date,
            duration: rentalDuration
        });

    } catch (error) {
        console.error('❌ Error al buscar el alquiler:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


const postRental = (async (req, res) => {

    const name = req.body.name;

    const validationRental = rentalValidationData(name)

    if (validationRental !== true) {
        return res.status(400).json({
            status: 'bad-request',
            message: validationRental
        })
    }

    try {

        const result = await registerRental(req.body.id_guitar, req.body.name, req.body.return_date, req.params.rentalId);
        return res.status(201).json({

            id_rental: result.id_guitar_rental,
            id_guitar: result.id_guitar,
            name: result.name,
            date: result.date,
            return_date: result.return_date,
        });

    } catch (error) {

        if (error.message.includes('FOREIGN KEY constraint failed')) {
            return res.status(400).json({ error: 'La guitarra ya existe o hay un problema con la clave foránea' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});



const putRental = (async (req, res) => {

    const idGuitar = req.body.id_guitar;
    const return_date = req.body.return_date;
    const idRental = req.params.rentalId;

    const isValidDate = (date) => {
        return !isNaN(Date.parse(date));
    };

    if (!isValidDate(return_date)) {
        return res.status(400).json({
            status: 'bad request',
            message: 'Invalid or missing return_date'
        });
    }

    if (!idGuitar) {
        return res.status(400).json({
            status: 'bad request',
            message: 'all fields are required'
        })
    }

    const updateRental = await modifyRental(idRental, idGuitar, return_date);

    if (!updateRental) {
        return res.status(404).json({
            status: 'not found',
            message: 'Rental not found or could not be updated'
        });
    }

    res.status(200).json(updateRental);
});


const deleteRental = (async (req, res) => {

    const idRental = req.params.rentalId;
    const delRental = await removeRental(idRental);


    if (!delRental) {
        return res.status(404).json({
            status: 'not found',
            message: 'Rental not found or could not be deleted'
        });
    }

    return res.status(200).json({
        status: 'success',
        message: `Rental with ID ${idRental} deleted successfully`
    });

});



module.exports = {
    getRental,
    getRentals,
    postRental,
    putRental,
    deleteRental
}
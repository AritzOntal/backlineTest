const { findGuitar, registerGuitar, findGuitars, returning, } = require("../service/guitars");

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
    //AÑADIR VALIDACIONES
    if (req.body.model === undefined || req.body.model === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'el campo modelo es obligatorio'
        });
        return;
    }
    if (req.body.condition && req.body.condition.toLowerCase() === 'new') {
        res.status(400).json({
            status: 'bad-request',
            message: 'la guitarra no puede ser nueva'
        });
        return;
    }

    try {

        //LLAMANDO AL SERVICE
        const result = await registerGuitar(req.body.model, req.body.year, req.body.condition);
        return res.status(201).json({
            //DEVUELVE TODA LA INFO DE LA GUITARRA INSERTADA CON SU ID.
            id_guitar: result.id,
            model: req.body.model,
            year: req.body.year,
            condition: req.body.condition,
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
    modifyGuitar(req.body.model, req.body.year, req.body.condition);

});

const deleteGuitar = (async (req, res) => {
    //TODO validaciones y comprobaciones
    const guitar = deleteGuitar(id);

});

module.exports = {
    getGuitar,
    getGuitars,
    postGuitar,
    putGuitar,
    deleteGuitar
}

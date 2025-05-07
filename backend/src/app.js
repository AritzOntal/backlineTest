const express = require('express');
const cors = require('cors');

const { config } = require('./config/configuration');

const app = express();

//GUARDAMOS LAS LLAMADAS CREARDAS EN "ROUTE"
const guitars = require('./route/guitars')
const rentals = require('./route/rentals')

//USAMOS LAS LLAMADS CON USE DE EXPRESS
app.use('/', guitars)
app.use('/', rentals)

app.use(cors());
app.use(express.json());

//ESCUCHARÁ EN EL PUERTO DE LA CONFIG
app.listen(config.service.port, () => {
    console.log('backend iniciado en el puerto ' + config.service.port);
});

//CRUD GUITARRAS

app.delete('/guitars/:guitarId', async (req, res) => {

    const { guitarId } = req.params;
    await db('guitars').where({ id_guitar: guitarId }).del();

    res.status(204).send()
});





/////////////////CRUD ALQUILERES

// app.get('/rentals', async (req, res) => {
//     const result = await db('guitar_rentals').select('*');
//     res.status(200).json(result);
// })

app.get('/rentals/:rentalId', async (req, res) => {
    try {
        const result = await db('guitar_rentals').where({ id_guitar_rental: req.params.rentalId }).first();

        if (!result) {
            return res.status(404).json({ error: 'El alquiler no existe' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('❌ Error al buscar el alquiler:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/rentals', async (req, res) => {

    try {

        await db('guitar_rentals').insert({
            id_guitar: req.body.id_guitar,
            date: req.body.date,
            return_date: req.body.return_date,
            name: req.body.name
        });

    } catch (error) {
        console.error('❌ Error al registrar el alquiler:', error.message);

        if (error.message.includes('FOREIGN KEY constraint failed')) {
            return res.status(400).json({ error: 'El ID de guitarra no existe' });
        }
    }

    res.status(201).json({ message: 'Alquiler registrado correctamente' });
});

app.delete('/rentals/:rentalId', async (req, res) => {

    const { rentalId } = req.params;
    await db('guitar_rentals').where({ id_guitar_rental: rentalId }).del();

    res.status(204).send()
});

app.put('/rentals/:rentalId', async (req, res) => {
    try {
        const updatedRows = await db('guitar_rentals')
            .where({ id_guitar_rental: req.params.rentalId })
            .update({
                id_guitar: req.body.id_guitar,
                date: req.body.date,
                return_date: req.body.return_date,
                name: req.body.name
            });

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'El alquiler no existe' });
        }

        return res.status(200).json({ message: 'Alquiler editado correctamente' });

    } catch (error) {
        console.error('❌ Error al actualizar el alquiler:', error.message);

        if (error.message.includes('FOREIGN KEY constraint failed')) {
            return res.status(400).json({ error: 'El ID de guitarra no existe' });
        }

        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = { app };

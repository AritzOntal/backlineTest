const express = require('express');
const cors = require('cors');

const { config } = require('./config/configuration');

const app = express();

//GUARDAMOS LAS LLAMADAS CREARDAS EN "ROUTE"
const guitars = require('./route/guitars')
const rentals = require('./route/rentals')

app.use(cors());
app.use(express.json());

//USAMOS LAS LLAMADS CON USE DE EXPRESS
app.use('/', guitars)
app.use('/', rentals)

//ESCUCHARÁ EN EL PUERTO DE LA CONFIG
app.listen(config.service.port, () => {
    console.log('backend iniciado en el puerto ' + config.service.port);
});


module.exports = { app };

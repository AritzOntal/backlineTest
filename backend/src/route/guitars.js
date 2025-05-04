const express = require('express');
const { getGuitar, getGuitars, postGuitar, putGuitar, deleteGuitar } = require('../controller/guitars');
//PERMITIR LAS OPERACIONES POR SEPARADO
const router = express.Router();

router.get('/guitars', getGuitars);
router.get('/guitars/:guitarId', getGuitar);
router.post('/guitars', postGuitar);
router.put('/guitars/:guitarId', putGuitar);
router.delete('/guitars/:guitarId', deleteGuitar);

module.exports = router;



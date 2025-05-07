const express = require('express');
const { getRentals,getRental, postRental, putRental, deleteRental } = require('../controller/rentals');
//PERMITIR LAS OPERACIONES POR SEPARADO
const router = express.Router();

router.get('/rentals', getRentals);
router.get('/rentals/:rentalId', getRental);
router.post('/rentals', postRental);
router.put('/rentals/:rentalId', putRental);
// router.delete('/rentals/:rentalId', deleteRental);

module.exports = router;
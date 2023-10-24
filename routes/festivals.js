const express = require('express');
const router = express.Router();

const { readData, readOne, createData, updateData, deleteData } = require('../Controllers/festival.controller')

//import your routes from the controller
//export them to the server

router
    .get('/', readData)
    .get('/:id', readOne)
    .post('/', createData)
    .put('/:id', updateData)
    .delete('/:id', deleteData)


module.exports = router;
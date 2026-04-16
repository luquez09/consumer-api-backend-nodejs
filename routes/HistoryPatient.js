const express = require("express");
const router = express.Router();
const historyController = require('../controller/historyController');

router.get('/:id', historyController.getPatientFullRecord);

module.exports = router;
const express = require("express");
const router = express.Router();
const pacienteController = require('../controller/pacientController');

router.post('/', pacienteController.addPacient);
router.get('/', pacienteController.selectPacient);


module.exports = router;
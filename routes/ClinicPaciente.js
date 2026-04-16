const express = require("express");
const router = express.Router();
const pacienteController = require('../controller/pacientController');

router.post('/', pacienteController.addPacient);
router.get('/', pacienteController.selectPacient);
router.put('/:id', pacienteController.updatePacient);
router.get('/:id', pacienteController.findPacient);
router.delete('/:id', pacienteController.deletePacient);

module.exports = router;
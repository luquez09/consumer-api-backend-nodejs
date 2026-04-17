const express = require("express");
const router = express.Router();
const trmController = require('../controller/trmController');

router.get('/', trmController.getLatestTRM);

module.exports = router;
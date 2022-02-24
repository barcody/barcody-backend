const express = require("express");
const router = express.Router();

// Controller
const controller_registeration = require("../controllers/controller_registeration");

router.post(
	"/registeration",  controller_registeration.registerAPI
);

module.exports = router;
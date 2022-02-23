const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_test");
const controller_db = require("../controllers/controller_db");

router.post(
	"/testing",  controller_appraisal_modules.testAPI
);

router.post(
	"/database", controller_db.dbAPI
);

module.exports = router;

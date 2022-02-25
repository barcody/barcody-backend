const express = require("express");
const router = express.Router();

// Controller
const controller_user = require("../controllers/controller_user");

router.post(
	"/registeration",  controller_user.registerAPI
);

router.post(
	"/auth",  controller_user.authAPI
);

module.exports = router;
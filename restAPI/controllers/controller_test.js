const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;

/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  {name}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.testAPI = async (req, res, next) => {
	res.send({
		error: false,
		data: "Test API Works",
	});
};

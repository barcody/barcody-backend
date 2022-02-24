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

// DB connection testing
const mongo_conn_native = require("../../mongo_conn_native").Connection;

/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  {name}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.testDB = async (req, res, next) => {
	// const dbInstance = mongo_conn_native.connectToMongo();
	const client = mongo_conn_native.client;
	try {
	await client.db("test").collection("test").insertOne({
		"test": "test"
	});

	} catch (e) {
		return res.send(e)
	}
	res.send({
		error: false,
		data: "DB API Works",
	});
};

const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;

// DB connection 
const mongo_conn_native = require("../../mongo_conn_native").Connection;
const { DATABASE, COLLECTION } = require("../../public/constant");


/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  {name}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.registerAPI = async (req, res, next) => {
	const client = mongo_conn_native.client;
	const username = req.body.username;
	const pass = req.body.pass;

	await client.db(DATABASE.BARCODY).collection(COLLECTION.ACCOUNTS).insertOne({
		"username": username,
		"pass": pass
	});

	res.status(200).send({
		error: false,
		result: "New user is created",
		isCreated: true
	});
};

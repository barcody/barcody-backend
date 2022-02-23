const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;

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
exports.dbAPI = async (req, res, next) => {
	// const dbInstance = mongo_conn_native.connectToMongo();
	const client = mongo_conn_native.client;
	console.log("-------------",client);
	await client.db("test").collection("test").insertOne({
		"test": "test"
	});
	res.send({
		error: false,
		data: "DB API Works",
	});
};
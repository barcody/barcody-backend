const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;

// DB instance 
const mongo_conn_native = require("../../mongo_conn_native").Connection;
// global constants
const { DATABASE, COLLECTION } = require("../../public/constant");


/**
 * @async
 * @route   POST /api/userAPI
 * @returns {error, result, isCreated} register API
 * @author Bassam 
 * @access  public
 * @version 1.0
 */

exports.registerAPI = async (req, res) => {
	const client = mongo_conn_native.client;
	const username = req.body.username;
	const pass = req.body.pass;

	if(isEmpty(username)) return res.status(200).send(_response(false, "Username is required"));
	if(isEmpty(pass)) return res.status(200).send(_response(false, "Password is required"));

	if(await isExist(username, client)) {
		return res.status(200).send({
			error: false,
			msg: "User is exist",
			isCreated: false
		});
	}
	try {
		await client.db(DATABASE.BARCODY).collection(COLLECTION.ACCOUNTS).insertOne({
			"username": username,
			"password": pass
		});
	} catch (err) {
		logger.error(err);
		console.log(err);
		return res.status(200).send(_response(true, err));
	}
	res.status(200).send(_response(false, "New user has been created"));
};

async function isExist(username, client) {
	let result = await client.db(DATABASE.BARCODY).collection(COLLECTION.ACCOUNTS)
		.findOne({
			username: username
		});
	if(result !== null) return true;
	else return false;
}

function _response(_error, _msg) {
	return { error: _error, msg: _msg};
}

function isEmpty(value) {
	if(value === "") return true;
	else return false;
}
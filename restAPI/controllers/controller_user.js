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
	const email = req.body.email;
	const fname = req.body.fname;
	const lname = req.body.lname;
	const mobile = req.body.mobile;

	if(isEmpty(username)) return res.status(200).send(_response(false, "Username is required"));
	if(isEmpty(pass)) return res.status(200).send(_response(false, "Password is required"));
	if(isEmpty(email)) return res.status(200).send(_response(false, "Email is required"));
	if(isEmpty(fname)) return res.status(200).send(_response(false, "First name is required"));
	if(isEmpty(lname)) return res.status(200).send(_response(false, "Last name is required"));
	if(isEmpty(mobile)) return res.status(200).send(_response(false, "Mobile name is required"));

	if(await isExist(username, client)) {
		return res.status(200).send({
			error: false,
			msg: "User is exist",
			isCreated: false
		});
	}
	try {
		await client.db(DATABASE.BARCODY)
			.collection(COLLECTION.ACCOUNTS)
			.insertOne({
				"username": username,
				"password": pass,
				"email": email,
				"mobile": mobile,
				"fname": fname,
				"lname": lname
			});
		res.status(200).send(_response(false, "New user has been created"));
	} catch (err) {
		logger.error(err);
		console.log(err);
		return res.status(200).send(_response(true, err));
	}
	
};

/**
 * @async
 * @route   POST /api/userAPI
 * @returns {error, result, isValid} auth API
 * @author Bassam 
 * @access  public
 * @version 1.0
 */

exports.authAPI = async (req, res) => {
	const client = mongo_conn_native.client;

	const username = req.body.username;
	const pass = req.body.pass;

	if(isEmpty(username)) return res.status(200).send(_response(false, "Username is required"));
	if(isEmpty(pass)) return res.status(200).send(_response(false, "Password is required"));

	let isUserExist = await isExist(username, client);
	if(!isUserExist) {
		return res.status(200).send({
			error: false,
			msg: "User is not exist",
		});
	}
	
	let isUserAuthenticated = await isAuthenticated(username, pass, client);
	if(isUserAuthenticated) return res.status(200).send(_response(false, "Authenticated successfully"));
	else return res.status(200).send(_response(false, "Password is incorrect"));
};

// check if user is already exist
async function isExist(username, client) {
	let result = 	await client.db(DATABASE.BARCODY)
		.collection(COLLECTION.ACCOUNTS)
		.findOne({
			username: username
		});

	if(result !== null) return true;
	else return false;
}

async function isAuthenticated(_username, _pass, client) {
	let _user = await client.db(DATABASE.BARCODY)
		.collection(COLLECTION.ACCOUNTS)
		.findOne({
			username: _username 
		});
	return _user.password === _pass;
}

// check if the value is empty 
function isEmpty(value) {
	if(value === "") return true;
	else return false;
}

// util - unified response body
function _response(_error, _msg) {
	return { error: _error, msg: _msg};
}
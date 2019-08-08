const request = require("request");

const createRequest = (input, callback) => {

	// Create the URL for the request
	let url = "https://api.openweathermap.org/data/2.5/";
	let endpoint = input.data.endpoint || "weather"
	url = url + endpoint

	// Create request params
	const cityID = input.data.cityID || "7839562";
	const numDays = input.data.days || "1"

	// Build your query object with the given input params, for example:
	let queryObj = {
		id: cityID,
		cnt: numDays,
		APPID: process.env.API_KEY
	}

	// Use this to clean up unused input parameters
	for (let key in queryObj) {
		if (queryObj[key] === "") {
			delete queryObj[key];
		}
	}

	const options = {
		url: url,
		qs: queryObj,
		json: true
	}

	request(options, (error, response, body) => {
		// Add any API-specific failure case here to pass that error back to Chainlink
		if (error || response.statusCode >= 400) {
			callback(response.statusCode, {
				jobRunID: input.id,
				status: "errored",
				error: body,
				statusCode: response.statusCode
			});
		} else {
			callback(response.statusCode, {
				jobRunID: input.id,
				data: body,
				statusCode: response.statusCode
			});
		}
	});
};

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
	createRequest(req.body, (statusCode, data) => {
		res.status(statusCode).send(data);
	});
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
	createRequest(event, (statusCode, data) => {
		callback(null, data);
	});
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
	createRequest(JSON.parse(event.body), (statusCode, data) => {
		callback(null, {
			statusCode: statusCode,
			body: JSON.stringify(data),
			isBase64Encoded: false
		});
	});
};

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;
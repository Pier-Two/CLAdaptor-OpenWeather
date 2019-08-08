const assert = require("chai").assert;
const createRequest = require("../index.js").createRequest;

describe("createRequest", () => {
	// The value here doesn"t matter, we just want to be sure that the adapter returns the same
	const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";

	context("todays weather with a specified city ID", () => {
		const req = {
			id: jobID,
			data: {
				endpoint: "weather",
				cityID: "7839562"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("forcasted weather with a specified city ID and number of days", () => {
		const req = {
			id: jobID,
			data: {
				endpoint: "forecast",
				days: "5",
				cityID: "7839562"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("forcasted weather with a specified city ID without number of days specified", () => {
		const req = {
			id: jobID,
			data: {
				endpoint: "forecast",
				cityID: "7839562"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("when using default parameters", () => {
		const req = {
			id: jobID,
			data: {}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});
});
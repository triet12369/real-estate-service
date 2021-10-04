
// standard response for every request
// response 200 everytime the server 

const httpStatus = require('http-status-codes');
const { ERROR_TYPES } = require('./constants');
const error = require('./error');

module.exports = (res, code, body) => {
    if (!res) {
        error(ERROR_TYPES.RESPONSE);
        return;
    }
    res.status(httpStatus.StatusCodes.OK).json({
        statusCode: code,
        body
    });
}
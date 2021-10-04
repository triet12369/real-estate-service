// Handle logging of errors
const { ERROR_TYPES } = require('./constants');

function error (type, error = 'Something happened.') {
    switch (type) {
        default:
            console.error(`${type} error: `, error);
            console.trace();
    }
}

module.exports = error;
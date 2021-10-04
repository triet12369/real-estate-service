var express = require('express');
const { StatusCodes } = require('http-status-codes');
var router = express.Router();
var db = require('../../db/index');
var error = require('../../error');
const stdResponse = require('../../stdResponse');

/* GET all properties. */
router.get('/', async function(req, res, next) {
    const query = `
        SELECT row_to_json(property) FROM ${db.config.defaultSchema}.property;
    `
    let response;
    try {
        response = await db.query(query);
    } catch (err) {
        error(QUERY, err);
    }

    console.log('Get property res', response);
    if (response) {
        stdResponse(res, StatusCodes.OK, response.rows);
    } else res.render('error');
});

module.exports = router;

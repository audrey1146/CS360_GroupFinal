/*****************************************************************************
 * File Name:     users.js
 * Date:          11/27/2020
 * Assignment:    Final Group Assignment
 * Purpose :      All of the user routes for the Slice of Pacific website
 ****************************************************************************/

let express = require('express');
let router = express.Router();

const {body,validationResult} = require("express-validator");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

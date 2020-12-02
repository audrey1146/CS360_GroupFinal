/*****************************************************************************
 * File Name:     users.js
 * Date:          11/27/2020
 * Assignment:    Final Group Assignment
 * Purpose :      All of the user routes for the Slice of Pacific website
 ****************************************************************************/

let express = require('express');
let router = express.Router();

const {body,validationResult} = require("express-validator");

var user_controller = require('../controllers/userController');

/* GET register page. */
router.get('/new', user_controller.user_new);

/* POST register new user. */
router.post('/new/add', user_controller.user_new_validation, user_controller.user_new_add);

/* GET profile page. */
router.get('/profile/:id', user_controller.user_profile);

/* POST edit profile information. */
router.post('/profile/:id', user_controller.user_edit_validation, user_controller.user_profile_edit);


module.exports = router;

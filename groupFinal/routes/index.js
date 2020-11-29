/*****************************************************************************
 * File Name:     index.js
 * Date:          11/27/2020
 * Assignment:    Final Group Assignment
 * Purpose :      All of the routes for the Slice of Pacific website
 ****************************************************************************/

let express = require('express');
let router = express.Router();

// Require controllers
let user_controller = require('../controllers/userController');


/* GET landing page. */
router.get('/', user_controller.user_landing);


/* GET login page. */
router.get('/login', user_controller.user_login);


/* GET registration page. */
router.get('/register', user_controller.user_register);


/* POST request to login */
router.post('/login', user_controller.user_login_post);


/* GET home poll page. */
router.get('/home/:id', user_controller.user_home);


/* GET home stats page. */
router.get('/stats/:id', user_controller.user_stats);


module.exports = router;

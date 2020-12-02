/*****************************************************************************
 * File Name:     index.js
 * Date:          11/27/2020
 * Assignment:    Final Group Assignment
 * Purpose :      All of the routes for the Slice of Pacific website
 ****************************************************************************/

// Require our controllers.
var topping_controller = require('../controllers/toppingController');
var dailyChoice_controller = require('../controllers/dailyChoiceController');
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

/* GET edit user page. */
router.get('/edit/:id', user_controller.user_profile);

// GET dailyChoice page.
router.get('/dailyChoice/:id', dailyChoice_controller.topping_list);

//POST new dailyChoice
router.post('/dailyChoice/new/add', dailyChoice_controller.dailyChoice_new_add);

module.exports = router;

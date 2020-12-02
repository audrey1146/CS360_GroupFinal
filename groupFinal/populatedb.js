#! /usr/bin/env node

console.log('This script populates some users, toppings, and dailyChoices to your database.');

// Get arguments passed on command line
let userArgs = process.argv.slice(2);

let async = require('async')
let User = require('./models/user')
let Topping = require('./models/topping')
let DailyChoice = require('./models/dailyChoice')

let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = []
let toppings = []
let dailychoice = []

// Function to create a user entry
function userCreate(user_name, password, first_name, last_name, email, security_answer, cb) 
{
  userdetail = { 
    user_name: user_name,
    password: password,
    first_name: first_name,
    last_name: last_name,
    email: email,
    security_answer: security_answer
  }

  let newUser = new User(userdetail);
       
  newUser.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New User: ' + newUser);
    users.push(newUser)
    cb(null, newUser);
  } );
}

// Function to create a topping entry
function toppingCreate(name, image_path, cb) 
{
  let newTopping = new Topping( { name: name, image_path: image_path });
       
  newTopping.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New Topping: ' + newTopping);
    toppings.push(newTopping)
    cb(null, newTopping);
  } );
}

// Function to create a daily choice entry
function dailyChoiceCreate(user_id, topping_id, time_stamp, cb) 
{
  let newChoice = new DailyChoice( { user_id: user_id, topping_id: topping_id, time_stamp: time_stamp });
       
  newChoice.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New Daily Choice: ' + newChoice);
    dailychoice.push(newChoice)
    cb(null, newChoice);
  } );
}

// Creation of test data - users
function createUsers(cb) {
  async.series(
    [
      function(callback) {
        userCreate('audrey', '123Pizza123', 'Audrey', 'Lincoln', 'audrey@gmail.com', 'Hermiston', callback);
      },
      function(callback) {
        userCreate('julia', '123Pizza123', 'Julia', 'Crumb', 'julia@gmail.com', 'Seattle', callback);
      },
      function(callback) {
        userCreate('duane', '123Pizza123', 'Duane', 'Keanu', 'duane@gmail.com', 'Mars', callback);
      },
      function(callback) {
        userCreate('zane', '123Pizza123', 'Zane', 'French', 'zane@gmail.com', 'Im a triple major I dont have time for pizza', callback);
      },

    ], cb);
}

// Creation of test data - toppings
function createToppings(cb) {
  async.parallel(
    [
      function(callback) {
        toppingCreate('None', '/public/images/none.svg', callback);
      },

      // MEATS
      function(callback) {
        toppingCreate('Pepperoni', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Sausage', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Ham', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Bacon', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Prosciutto', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Spicy Italian Salami', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Chorizo', '/public/images/pork.svg', callback);
      },
      function(callback) {
        toppingCreate('Grilled Chicken', '/public/images/chicken.svg', callback);
      },
      function(callback) {
        toppingCreate('Fried Egg', '/public/images/chicken.svg', callback);
      },
      function(callback) {
        toppingCreate('Buffalo Chicken', '/public/images/chicken.svg', callback);
      },
      function(callback) {
        toppingCreate('Shrimp', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Sardines', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Anchovies', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Lobster', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Cajun Prawns', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Crawfish', '/public/images/fish.svg', callback);
      },
      function(callback) {
        toppingCreate('Ground Beef', '/public/images/beef.svg', callback);
      },
      function(callback) {
        toppingCreate('Meatballs', '/public/images/beef.svg', callback);
      },

      // CHEESE
      function(callback) {
        toppingCreate('Mozzarella', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Blue Cheese', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Goat Cheese', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Gorgonzola', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Parmesan', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Provolone', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Smoked Gouda', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Ricota', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Cheddar Cheese', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Feta', '/public/images/cheese.svg', callback);
      },
      function(callback) {
        toppingCreate('Grúyere cheese', '/public/images/cheese.svg', callback);
      },

      // VEGGIES
      function(callback) {
        toppingCreate('Mushroom', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Red Onion', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Red Peppers', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Pineapple', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Sun-Dried Tomatoes', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Cherry Tomatoes', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Avocado', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Caramelized Onions', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Kale', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Spinach', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Black Olives', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Garlic', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Capers', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Artichoke Hearts', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Jalapeños', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Thin Sliced Potatoes', '/public/images/vegetables.svg', callback);
      },
      function(callback) {
        toppingCreate('Basil', '/public/images/vegetables.svg', callback);
      },

      // Sauce / Condiments
      function(callback) {
        toppingCreate('BBQ Sauce', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Marinara Sauce', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Alfredo Sauce', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Pesto', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Olive Oil', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Hot Wing Sauce', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Ranch', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Romesco Sauce', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Salsa', '/public/images/seasoning.svg', callback);
      },
      function(callback) {
        toppingCreate('Hot Sauce', '/public/images/seasoning.svg', callback);
      },

    ], cb);
}

// Creation of test data - daily choices
function createDailyToppings(cb) {
  async.parallel(
    [
      function(callback) {
        dailyChoiceCreate(users[0], toppings[4], '2020-11-13', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[1], toppings[1], '2020-11-10', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[2], toppings[2], '2020-11-11', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[3], toppings[3], '2020-11-12', callback);
      },
      
    ], cb);
}

async.series([
  createUsers,
  createToppings,
  createDailyToppings
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('Toppings: '+ toppings);
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
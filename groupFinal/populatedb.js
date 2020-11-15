#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var User = require('./models/user')
var Topping = require('./models/topping')
var DailyChoice = require('./models/dailyChoice')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var toppings = []
var dailychoice = []

// Function to create a user entry
function userCreate(user_name, password,
  first_name, last_name, email, security_answer) 
{
  userdetail = { 
    user_name: user_name,
    password: password,
    first_name: first_name,
    last_name: last_name,
    email: email,
    security_answer, security_answer
  }

  var newUser = new User( { userdetail });
       
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
function toppingCreate(name, image_path) 
{
  var newTopping = new Topping( { name: name, image_path: image_path });
       
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
function dailyChoiceCreate(user_id, topping_id, time_stamp) 
{
  var newChoice = new DailyChoice( { user_id: user_id, topping_id: topping_id, time_stamp: time_stamp });
       
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
        userCreate('zane', '123Pizza123', 'Zane', 'French', 'zane@gmail.com', 'Im a trip major I dont have time for pizza', callback);
      },

    ], cb);
}

// Creation of test data - toppings
function createToppings(cb) {
  async.series(
    [
      function(callback) {
        toppingCreate('None', '../images/pizza.svg', callback);
      },

      // MEATS
      function(callback) {
        toppingCreate('Pepperoni', '../images/pizza.svg', callback);
      },

      // FAKE MEATS
      function(callback) {
        toppingCreate('Tofu', '../images/pizza.svg', callback);
      },

      // CHEESE
      function(callback) {
        toppingCreate('Mozzarella', '../images/pizza.svg', callback);
      },

      // VEGGIES
      function(callback) {
        toppingCreate('Mushroom', '../images/pizza.svg', callback);
      },

    ], cb);
}

// Creation of test data - daily choices
function createDailyToppings(cb) {
  async.series(
    [
      function(callback) {
        dailyChoiceCreate(users[0].ID, toppings[4].ID, '2020-11-13', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[1].ID, toppings[1].ID, '2020-11-10', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[2].ID, toppings[2].ID, '2020-11-11', callback);
      },
      function(callback) {
        dailyChoiceCreate(users[3].ID, toppings[3].ID, '2020-11-12', callback);
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
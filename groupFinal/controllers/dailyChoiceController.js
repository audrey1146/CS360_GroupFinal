/*****************************************************************************
 * File Name:     dailyChoiceController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the dailyChoice schema
 ****************************************************************************/

let Topping = require('../models/topping')
let DailyChoice = require('../models/dailyChoice');
let async = require('async');

exports.topping_list = function (req, res, next) 
{
  Topping.find().sort([['name', 'ascending']]).exec(function (err, list_toppings) 
  {
    if (err) { return next(err); }
    // Successful, so render.
    console.log(list_toppings);
    res.render('index', { title: 'Topping List', toppings: list_toppings });
  })
};

/*Topping.find().sort([['name', 'ascending']]).exec(function (err, list_toppings) 
{
  if (err) { return next(err); }
  // Successful, so render.
  console.log(list_toppings);
  //res.render('dailyChoice', { title: 'Daily Choice', toppings: list_toppings });
});*/

/*exports.dailyChoice = function (req, res, next) {

  Topping.find().populate('list_toppings').exec(function (err, list_toppings) 
  {
    if (err) { return next(err); }
    //console.log(topping[0]);
    res.render('dailyChoice', { title: 'Daily Choice', topping_list: list_toppings });
  })

};*/

/*Topping.find().populate('toppings').exec(function (err, toppings) 
{
  if (err) { return next(err); }
  console.log(toppings[10].name, toppings[10].image_path);
  //res.render('dailyChoice', { title: 'Daily Choice', topping: topping });
});*/
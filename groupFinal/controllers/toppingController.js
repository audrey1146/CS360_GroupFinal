/*****************************************************************************
 * File Name:     toppingController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the topping schema
 ****************************************************************************/

var Topping = require('../models/topping');
var async = require('async');

/****************************************************************************
Function:      topping_list
Description:   Gets a list of all of the toppings
****************************************************************************/
exports.topping_list = function (req, res, next) 
{
  Topping.find().sort([['name', 'ascending']]).exec(function (err, list_toppings) 
  {
    if (err) { return next(err); }
    // Successful, so render.
    res.render('topping_list', { title: 'Topping List', topping_list: list_toppings });
  })
};
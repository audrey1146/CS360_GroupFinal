/*****************************************************************************
 * File Name:     topping.js
 * Date:          11/12/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Define the schema for the Topping table
 ****************************************************************************/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ToppingSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 50, unique: true},
    image: {},
  }
);


// TODO:  Understand virtual properties and add what is needed


//Export model
module.exports = mongoose.model('Topping', ToppingSchema);
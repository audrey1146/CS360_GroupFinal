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
    image_path: {type: String, required: true, maxlength: 50}
  }
);

// Virtual for toppings ID
ToppingSchema.virtual('ID').get(function () {
  return this._id;
});

//Export model
module.exports = mongoose.model('Topping', ToppingSchema);
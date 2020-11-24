/*****************************************************************************
 * File Name:     user.js
 * Date:          11/12/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Define the schema for the User table
 ****************************************************************************/

var mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    user_name: {type: String, required: true, maxlength: 50, unique: true},
    password: {type: String, required: true, maxlength: 50,  minlength: 8},
    first_name: {type: String, required: true, maxlength: 50},
    last_name: {type: String, required: true, maxlength: 50},
    email: {type: String, required: true, maxlength: 50, unique: true},
    security_answer: {type: String, required: true, maxlength: 100},    // Assuming question is: Name of the city you had your first piece of pizza.
  }
);


// TODO:  Understand virtual properties and add what is needed

// Virtual for users ID
UserSchema.virtual('ID').get(function () {
  return this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
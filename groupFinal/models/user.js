/*****************************************************************************
 * File Name:     user.js
 * Date:          11/12/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Define the schema for the User table
 ****************************************************************************/

let mongoose = require('mongoose');

<<<<<<< HEAD
const { body, validationResult } = require('express-validator');

var Schema = mongoose.Schema;
=======
let Schema = mongoose.Schema;
>>>>>>> 89fc5f7aa0969e83c559967c1c064d7574de6511

let UserSchema = new Schema(
  {
    user_name: {type: String, required: true, maxlength: 50, unique: true},
    password: {type: String, required: true, maxlength: 50,  minlength: 8},
    first_name: {type: String, required: true, maxlength: 50},
    last_name: {type: String, required: true, maxlength: 50},
    email: {type: String, required: true, maxlength: 50, unique: true},
    // Security question is: Name of the city you had your first piece of pizza.
    security_answer: {type: String, required: true, maxlength: 100},
  }
);

// Virtual for users ID
UserSchema.virtual('ID').get(function () {
  return this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
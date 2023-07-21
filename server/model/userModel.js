const mongoose = require('mongoose')
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: 'Username already token',
      unique: true,
      minlength: 5,
      maxlength: 20
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: validator.isEmail
    },

    usertype: {
      type: String,
      required: false,
      enum: ['staff', 'customer'],
      default: 'customer'
    },

    expire_key: { 
      type: String,
      required: false 
    },

  }, { timestamps: true }
)
module.exports = mongoose.model("User", userSchema)
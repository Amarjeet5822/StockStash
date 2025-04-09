const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, //Allows null + unique together ( for non-google users)
  },
  name: {
    type: String,
  },
  email: { type: String, unique:true },
  password: { type: String }, // For local auth
},
{
  timestamps: true,
  versionKey: false,
});

module.exports

const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db Connected with Atlas");
  } catch (error) {
    console.log(error?.message)
  }
};
module.exports = dbConnect;
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({

});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
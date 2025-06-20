const mongoose = require("mongoose");

const loveSchema = new mongoose.Schema(
    {
    count: {type: Number, default: 0}
    }
);

module.exports = mongoose.model("Love", loveSchema); // Creates a model called Love from schema
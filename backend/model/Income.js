const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
    {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String},
    source: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    },
    {timestamps: true} // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Income", IncomeSchema); // Creates a model called Income from schema
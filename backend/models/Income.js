const mongoose = require("mongoose");


const IncomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String, default: ""},
    source: {type: String, required: true}, //Example: salary, freelance, etc
    amount: {type: Number, required: true},
    description: {type: String, default: ""},
    date: {type: Date, required: true},
}, { timestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);
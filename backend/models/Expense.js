const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  icon: { type: String, default: "" },
  category: { type: String, required: true }, //Example: food, rent
  amount: { type: Number, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);

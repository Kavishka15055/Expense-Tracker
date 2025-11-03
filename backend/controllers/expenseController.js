const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const xlsx = require('xlsx');
const Expense = require("../models/Expense");



// Add Expense source 
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date} = req.body;

        //Validation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

// Get all Expense source 
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId}).sort({ date: -1});
        res.json(expense);
    }catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (!expense || expense.length === 0) {
      return res.status(404).json({ message: "No expense records found" });
    }

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split("T")[0] : "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");

    const fileName = `expense_details_${Date.now()}.xlsx`;
    const downloadsDir = path.join(__dirname, "../downloads");
    // ensure downloads directory exists
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    const filePath = path.join(downloadsDir, fileName);

    xlsx.writeFile(wb, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
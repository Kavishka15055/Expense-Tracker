const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const xlsx = require('xlsx');
const Income = require("../models/Income");



// Add Income source 
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date} = req.body;

        //Validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

// Get all Income source 
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId}).sort({ date: -1});
        res.json(income);
    }catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    if (!income || income.length === 0) {
      return res.status(404).json({ message: "No income records found" });
    }

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], 
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const fileName = `income_details_${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, "../downloads", fileName);

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
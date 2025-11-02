const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId }},
            {$group: { _id:null, total: {$sum: "$amount"}}},
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Get income transactions in the last 60 days
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            createdAt: { $gte: sixtyDaysAgo }
        }).sort({ createdAt: -1 }).lean();

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            createdAt: { $gte: thirtyDaysAgo }
        }).sort({ createdAt: -1 }).lean();

        // Get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expense)
        const lastIncomeTransactions = await Income.find({ 
            userId: userObjectId
        }).sort({ createdAt: -1 }).limit(5).lean();

        const lastExpenseTransactions = await Expense.find({ 
            userId: userObjectId
        }).sort({ createdAt: -1 }).limit(5).lean();

        const lastTransactions = [
            ...lastIncomeTransactions.map(txn => ({
                ...txn,
                type: "income"
            })),
            ...lastExpenseTransactions.map(txn => ({
                ...txn,
                type: "expense"
            }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5); // Sort by createdAt and take top 5

        //Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error});
    }
}
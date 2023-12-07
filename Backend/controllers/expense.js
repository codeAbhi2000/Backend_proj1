const Expense = require("../models/expense");
require("dotenv").config();

exports.postAddExpense = (req, res) => {
  const desc = req.body.description;
  const amount = req.body.amount;
  const date = req.body.date;
  const uid = req.body.uid;
  const cat_name = req.body.cat_id;
  try {
    const expense = new Expense({
      description: desc,
      date: date,
      amount: amount,
      category: cat_name,
      uid: uid,
    });
    expense
      .save()
      .then(() => {
        res.json({
          msg: "Expense added successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

exports.editExpense = (req, res) => {
  const id = req.body.id;
  const desc = req.body.description;
  const amount = req.body.amount;
  const date = req.body.date;
  const uid = req.body.uid;
  const cat_name = req.body.cat_id;

  Expense.findByIdAndUpdate(id, {
    $set: {
      description: desc,
      amount: amount,
      date: date,
      category: cat_name,
      uid: uid,
    },
  })
    .then((result) => {
        // console.log(result);
      return res.status(200).json({
        msg: "Expense updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: "Something went wrong",
      });
    });
};

exports.getAllUserExpenses = (req, res) => {
  const uid = req.params.id;
  try {
    Expense.find({ uid: uid })
      .then((data) => {
        // console.log(data);
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

exports.getCatExpenses = (req, res) => {
  const uid = req.params.id;
  try {
    const currentMonth = new Date().getMonth() + 1; // Note: Months are zero-indexed in JavaScript Dates

    Expense.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$date" }, currentMonth],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalExpense: { $sum: "$amount" },
        },
      },
    ])
      .then((result) => {
        // console.log(result);
        return res.status(200).json({
          data: result,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

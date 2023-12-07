const Budget = require("../models/budget");
require("dotenv").config();

exports.postAddBudget = async (req, res) => {
  const income = req.body.income;
  const budget = req.body.budget;
  const savings = req.body.savings;
  const date = req.body.date;
  const uid = req.body.uid;
  const cat_id_limit = req.body.cat_id_limit;
  const ubudget = new Budget({
    income: income,
    budget: budget,
    savings: savings,
    date: date,
    uid: uid,
    cat_limits: {
        investment : parseInt(cat_id_limit.investment),
        bills_utilities : parseInt(cat_id_limit.billUtilities),
        transportation : parseInt(cat_id_limit.transportation),
        shopping :parseInt(cat_id_limit.shopping),
        grocery : parseInt(cat_id_limit.grocery),
        others :parseInt(cat_id_limit.others)
    },
  });

  try {
    await ubudget.save();

    res.json({
      msg: "Budget added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "something went wrong",
    });
  }
};

exports.getBudgetLimit =  (req, res) => {
    const uid = req.params.id
    const currentMonth = new Date().getMonth() + 1;
    try
    {

        Budget.find({
            uid: uid,
            date: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1) },
          })
            .then((data) => {
                // console.log(data);
                res.json({
                    data: data
                })
            }).catch(err => console.log(err))
    } catch (error)
    {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

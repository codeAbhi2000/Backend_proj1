const Limit = require('../models/set_limit')
const Budget = require('../models/budget')
require('dotenv').config();


exports.postAddBudget = async (req, res) => {
    const income = req.body.income;
    const budget = req.body.budget;
    const savings = req.body.savings;
    const date = req.body.date;
    const uid = req.body.uid;
    const cat_id_limit = req.body.cat_id_limit
    const ubudget = new Budget(income, budget, savings, date, uid)
    const catLimits = new Limit(cat_id_limit, date, uid)
    try
    {
        await ubudget.save()
        await catLimits.save()

        res.json({
            msg: 'Budget added successfully'
        })
    } catch (error)
    {
        console.log(error);
        res.json({
            msg: 'something went wrong'
        })
    }
}


exports.getBudgetLimit = (req, res) => {
    const uid = req.params.id
    try
    {

        Limit.getBudgetLimit(uid)
            .then((data) => {
                res.json({
                    data: data[0]
                })
            }).catch(err => console.log(err))
    } catch (error)
    {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
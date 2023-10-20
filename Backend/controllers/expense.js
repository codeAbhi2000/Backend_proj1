
const Expense = require('../models/expense')
require('dotenv').config();
const Razorpay = require('razorpay')


exports.postAddExpense = (req, res) => {
    const id = req.body.id
    const desc = req.body.description;
    const amount = req.body.amount;
    const date = req.body.date;
    const uid = req.body.uid
    const cat_id = req.body.cat_id;
    try
    {

        const expense = new Expense(id, desc, date, amount, cat_id, uid)
        expense.save()
            .then(() => {
                res.json({
                    msg: 'Expense added successfully'
                })
            }).catch(err => console.log(err))
    } catch (error)
    {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

exports.getAllUserExpenses = (req, res) => {
    const uid = req.params.id
    try
    {

        Expense.getAllExpenses(uid)
            .then((data) => {
                res.json({
                    data: data[0]
                })
            }).catch(err => {
                console.log(err)
            })
    } catch (error)
    {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}


exports.getCatExpenses = (req, res) => {
    const uid = req.params.id
    try
    {

        Expense.getCatExpenses(uid)
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




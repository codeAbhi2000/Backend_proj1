const express = require('express')
const validator = require('../middleware/authenticator')
const router = express.Router()

const expenseController = require('../controllers/expense')


router.post('/addExpense',validator,expenseController.postAddExpense)

router.get('/getAllExpenses/:id',validator,expenseController.getAllUserExpenses)

router.get('/getCatExpense/:id',validator,expenseController.getCatExpenses)

module.exports = router


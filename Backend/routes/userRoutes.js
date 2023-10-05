const express = require('express')
const validator = require('../middleware/authenticator')

const userControler = require('../controllers/user')

const router = express.Router()


router.post('/signup',userControler.postSignUpUser)

router.post('/login',userControler.postLoginUser)

router.post('/addExpense',validator,userControler.postAddExpense)

router.post('/addBudget',validator,userControler.postAddBudget)

router.post('/getMonthReport',validator,userControler.postGetMonthReport)

router.post('/getYearReport',validator,userControler.postGetYearReport)

router.post('/getReportGivenRange',validator,userControler.postGetReportGivenRange)

router.get('/getAllUserDetails/:id',validator,userControler.getOverAllUserDeatails)

router.get('/getAllExpenses/:id',validator,userControler.getAllUserExpenses)

router.get('/getCatExpense/:id',validator,userControler.getCatExpenses)

router.get('/getBudgetLimit/:id',validator,userControler.getBudgetLimit)


module.exports = router

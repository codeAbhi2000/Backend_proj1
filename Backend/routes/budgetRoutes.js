const express = require('express')
const validator = require('../middleware/authenticator')
const router = express.Router()


const budgetController = require('../controllers/budget')

router.post('/addBudget',validator,budgetController.postAddBudget)

router.get('/getBudgetLimit/:id',validator,budgetController.getBudgetLimit)


module.exports = router
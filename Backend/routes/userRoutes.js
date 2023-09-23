const express = require('express')


const userControler = require('../controllers/user')

const router = express.Router()


router.post('/signup',userControler.postSignUpUser)

router.post('/login',userControler.postLoginUser)

router.get('/getAllExpenses/:id',userControler.getAllUserExpenses)



module.exports = router

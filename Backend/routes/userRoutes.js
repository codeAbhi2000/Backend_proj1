const express = require('express')
const validator = require('../middleware/authenticator')
const router = express.Router()


const userControler = require('../controllers/user')


router.post('/signup',userControler.postSignUpUser)

router.post('/login',userControler.postLoginUser)

router.post('/succesPurchase',validator,userControler.successFullPurchase)

router.get('/subscribeToMembership/:id',validator,userControler.purchasePremium)

router.get('/getAllUserDetails/:id',validator,userControler.getOverAllUserDeatails)

router.post('/forgotPassword/',userControler.forgotPassword)

router.post('/resetPassword',userControler.resetPassword)



module.exports = router

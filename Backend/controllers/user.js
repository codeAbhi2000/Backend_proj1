const User = require('../models/user')
const Expense = require('../models/expense')
const Limit = require('../models/set_limit')
const Budget = require('../models/budget')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const myToken = "$moBhi$Love430"

exports.postSignUpUser = async (req,res,next)=>{
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.password
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass,salt)

    // console.log(hashedPassword);

    const user = new User(name,email,hashedPassword)

    user.save()
    .then(()=>{
        res.json({
            msg:'user added successfully'
        })
    }).catch(err =>{
        console.log(err) 
        res.json({
            msg:"User Already Exixst"
        })
    })

}

exports.postLoginUser = async (req,res,next) => {
   
    const password =req.body.password
    const email = req.body.email
    const userDetails = await User.getOverAllUserDeatails(email)
    // console.log(userDetails);
    User.findUserById(email)
    .then(async (data)=>{
        // console.log(data[0][0].password);
        const result = await bcrypt.compare(password, data[0][0].password)
        const authToken = jwt.sign(data[0][0].password,myToken)
        if(result){
            // console.log(userDetails);
            res.json({
                data:userDetails,
                token:authToken
            })
        }else{
            res.json({
                msg:'Inavalid Credentials'
            })
        }
    }).catch(err => {
        console.log(err)
        res.json({
            msg:'Inavalid Credentials'
        })
    })   
}

exports.getAllUserExpenses = (req,res)=>{
    const uid = req.params.id
    Expense.getAllExpenses(uid)
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => {
        console.log(err)})
}

exports.getCatExpenses = (req,res) =>{
    const uid = req.params.id
    Expense.getCatExpenses(uid)
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => console.log(err))
}


exports.getBudgetLimit = (req,res)=>{
    const uid = req.params.id
    Limit.getBudgetLimit(uid)
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => console.log(err))
}

exports.postAddExpense = (req,res)=>{
    const desc = req.body.description;
    const amount = req.body.amount;
    const date = req.body.date;
    const uid = req.body.uid
    const cat_id = req.body.cat_id;
    const expense = new Expense(null,desc,date,amount,cat_id,uid)
    expense.save()
    .then(()=>{
        res.json({
            msg:'Expense added successfully'
        })
    }).catch(err => console.log(err))
}

exports.getOverAllUserDeatails = (req,res)=>{
    const id = req.params.id;
    User.getOverAllUserDeatails(id)
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => console.log(err))
}

exports.postAddBudget = async (req,res)=>{
    const income = req.body.income;
    const budget = req.body.budget;
    const savings = req.body.savings;
    const date = req.body.date;
    const uid = req.body.uid;
    const cat_id_limit = req.body.cat_id_limit
    const ubudget = new Budget(income,budget,savings,date,uid)
    const catLimits = new Limit(cat_id_limit,date,uid)
    try {
        await ubudget.save()
        await catLimits.save()

    res.json({
        msg:'Budget added successfully'
    })
    } catch (error) {
        console.log(error);
        res.json({
            msg:'something went wrong'
        })
    }
}


exports.postGetMonthReport = async  (req,res,next)=>{
    const {month,uid} = req.body
    try {
        const data = await Expense.getMonthReport(month,uid)
        //  console.log(data);
             res.json({
                 data:data
             })
    } catch (error) {
        res.json({
            msg:'something went wrong'
        })
    }
    
}

exports.postGetYearReport = async  (req,res,next)=>{
    const {year,uid} = req.body
    try {
        const data = await Expense.getYearReport(year,uid)
        //  console.log(data);
             res.json({
                 data:data
             })
    } catch (error) {
        res.json({
            msg:'something went wrong'
        })
    } 
    
}

exports.postGetReportGivenRange = async  (req,res,next)=>{
    const {start_date,end_date,uid} = req.body
    try {
        const data = await Expense.getReportGivenRange(start_date,end_date,uid)
        //  console.log(data);
             res.json({
                 data:data
             })
    } catch (error) {
        res.json({
            msg:'something went wrong'
        })
    } 
}
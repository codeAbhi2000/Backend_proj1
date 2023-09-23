const User = require('../models/user')
const Expense = require('../models/expense')
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
    }).catch(err =>console.log(err) )

}

exports.postLoginUser = async (req,res,next) => {
   
    const password =req.body.password
    const email = req.body.email

    User.findUserById(email)
    .then(async (data)=>{
        // console.log(data[0][0].password);
        const result = await bcrypt.compare(password, data[0][0].password)
        if(result){
            res.json({data:data[0]})
        }
    }).catch(err => console.log(err))

   
}

exports.getAllUserExpenses = (req,res,next)=>{
    const uid = req.params.id
    Expense.getAllExpenses(uid)
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => console.log(err))
}
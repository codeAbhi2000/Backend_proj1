const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const reportRoutes = require('./routes/reportRoutes')
const budgetRoutes = require('./routes/budgetRoutes')
const fileUpload = require('express-fileupload')
const app = express()

const streamOfLogs = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(cors())
app.use(helmet({
    contentSecurityPolicy : false,
}))
app.use(morgan('combined',{stream:streamOfLogs}))
app.use(fileUpload())
app.use(bodyParser.json({extended:false}))


const _dirname = path.dirname("Backend_proj1")
const reactPath = path.join(_dirname,'../expense_tracker/build')

app.use(express.static(reactPath))

app.get('/',(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../expense_tracker/build/index.html"),(err)=>{
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

app.get('/resetPassword/:userId/:token',(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../expense_tracker/build/index.html"),(err)=>{
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

app.use(expenseRoutes)
app.use(userRoutes)
app.use(budgetRoutes)
app.use(reportRoutes)


app.listen(5000,()=>{
    console.log(`Server is Listening on Port number : ${5000}`);
})
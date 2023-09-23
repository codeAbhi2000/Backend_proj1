const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors())

app.use(bodyParser.json({extended:false}))

app.use(userRoutes)


app.listen(5000,()=>{
    console.log(`Server is Listening on Port number : ${5000}`);
})
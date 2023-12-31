const User = require('../models/user')
const Expense = require('../models/expense')
const Limit = require('../models/set_limit')
const Budget = require('../models/budget')
const Purchase = require('../models/purchase')
const Downloads = require('../models/downloads')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const Razorpay = require('razorpay')
const nodemailer = require('nodemailer');

const AWS = require('aws-sdk')


const myToken = "$moBhi$Love430"

const uploadToS3 = async (data, fileName) => {
    // console.log(data);
    const blob = new Blob([data], { type: 'application/pdf' });
    const buffer = await blob.arrayBuffer();
    const bufferData = Buffer.from(buffer);

    AWS.config.update({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,

    });

    const s3 = new AWS.S3()
    const params = {
        Bucket: 'abhshekexpenseapp',
        Key: fileName,
        Body: bufferData,
        ContentType: 'application/pdf',
        ACL: 'public-read',
    };

    return new Promise(async (resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err)
            {
                console.error('S3 upload error', err);
                reject(err)
            } else
            {
                //   console.log('File uploaded to S3:', data.Location);
                resolve(data.Location)
                // You can access the S3 URL in the data.Location property
            }
        });

    })
}


exports.postSignUpUser = async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)

    // console.log(hashedPassword);
    try
    {

        const user = new User(name, email, hashedPassword)

        user.save()
            .then(() => {
                res.json({
                    msg: 'Signup successfull'
                })
            }).catch(err => {
                console.log(err)
                res.json({
                    msg: "User Already Exixst"
                })
            })
    } catch (error)
    {
        res.status(500).json({
            msg: 'something went wrong'
        })
    }

}

exports.postLoginUser = async (req, res, next) => {

    const password = req.body.password
    const email = req.body.email
    try
    {

        const userDetails = await User.getOverAllUserDeatails(email)
        // console.log(userDetails);
        User.findUserById(email)
            .then(async (data) => {
                // console.log(data[0][0].password);
                const result = await bcrypt.compare(password, data[0][0].password)
                const authToken = jwt.sign(data[0][0].password, myToken)
                if (result)
                {
                    // console.log(userDetails);
                    res.json({
                        data: userDetails,
                        token: authToken
                    })
                } else
                {
                    res.json({
                        msg: 'Inavalid Credentials'
                    })
                }
            }).catch(err => {
                console.log(err)
                res.json({
                    msg: 'Inavalid Credentials'
                })
            })
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


exports.getBudgetLimit = (req, res) => {
    const uid = req.params.id
    try
    {

        Limit.getBudgetLimit(uid)
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

exports.getOverAllUserDeatails = (req, res) => {
    const id = req.params.id;
    try
    {

        User.getOverAllUserDeatails(id)
            .then((data) => {
                res.json({
                    data: data
                })
            }).catch(err => console.log(err))
    } catch (error)
    {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

exports.postAddBudget = async (req, res) => {
    const income = req.body.income;
    const budget = req.body.budget;
    const savings = req.body.savings;
    const date = req.body.date;
    const uid = req.body.uid;
    const cat_id_limit = req.body.cat_id_limit
    const ubudget = new Budget(income, budget, savings, date, uid)
    const catLimits = new Limit(cat_id_limit, date, uid)
    try
    {
        await ubudget.save()
        await catLimits.save()

        res.json({
            msg: 'Budget added successfully'
        })
    } catch (error)
    {
        console.log(error);
        res.json({
            msg: 'something went wrong'
        })
    }
}


exports.postGetMonthReport = async (req, res, next) => {
    const { month, uid } = req.body
    try
    {
        const data = await Expense.getMonthReport(month, uid)
        //  console.log(data);
        res.json({
            data: data
        })
    } catch (error)
    {
        res.json({
            msg: 'something went wrong'
        })
    }

}

exports.postGetYearReport = async (req, res, next) => {
    const { year, uid } = req.body
    try
    {
        const data = await Expense.getYearReport(year, uid)
        //  console.log(data);
        res.json({
            data: data
        })
    } catch (error)
    {
        res.json({
            msg: 'something went wrong'
        })
    }

}

exports.postGetReportGivenRange = async (req, res, next) => {
    const { start_date, end_date, uid } = req.body
    try
    {
        const data = await Expense.getReportGivenRange(start_date, end_date, uid)
        //  console.log(data);
        res.json({
            data: data
        })
    } catch (error)
    {
        res.json({
            msg: 'something went wrong'
        })
    }
}

exports.purchasePremium = (req, res) => {
    const id = req.params.id
    // console.log(process.env.RAZOR_PAY_KEY_ID);
    try
    {
        const rzp = new Razorpay({
            key_id: process.env.RAZOR_PAY_KEY_ID,
            key_secret: process.env.RAZOR_PAY_KEY_SECRET
        })

        const amount = 2500
        // console.log(rzp);
        rzp.orders.create({ amount: amount, currency: 'INR' }, (err, order) => {
            if (err)
            {
                console.log(err);
                return res.status(500).json({
                    msg: "Something Went Wrong",
                });
            }

            const purchase = new Purchase(order.id, 'PENDING', id)
            purchase.save().
                then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id })
                }).catch(err => console.log(err))
        })
    } catch (error)
    {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
}


exports.successFullPurchase = async (req, res) => {
    const uid = req.body.uid;
    const ord_id = req.body.order_id
    // console.log(ord_id,uid);
    try
    {

        await Purchase.update('SUCCESS', ord_id, uid)
        await User.updateMemberShip(uid)

        res.json({
            msg: 'Your Membership upgraded'
        })
    } catch (error)
    {
        res.status(500).json({
            msg: 'Somthing went wrong'
        })
    }
}

exports.forgotPassword = async (req, res) => {
    const email = req.body.email

    const user = await User.findUserById(email)
    // console.log(user);
    if (user[0].length === 0)
    {
        res.status(404).json({
            msg: 'Email does not exists'
        })
    } else
    {
        const authToken = jwt.sign(user[0][0].email, myToken)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abhishekvvet@gmail.com',
                pass: process.env.M_API_KEY
            }
        });

        const mailOptions = {
            from: 'abhishekvvet@gmail.com',
            to: email,
            subject: 'Your Password Reset Link',
            html: `<a href="http://3.109.94.251:5000/resetPassword/${user[0][0].id}/${authToken}">click here</a> to reset your password`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error)
            {
                console.log(error);
            } else
            {
                res.status(200).json({
                    data: info
                })
            }
        });
    }

}

exports.resetPassword = async (req, res) => {
    const { uid, pass } = req.body

    console.log(uid, pass);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)

    try
    {
        const result = await User.resetPassword(hashedPassword, uid)
        //    console.log(result);

        res.status(200).json({
            msg: "Your Password is Reset Successful"
        })

    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

exports.postDownloadReport = async (req, res) => {
    const { uid } = req.body
    // console.log('Request Body:', req.body);
    // console.log('Request Headers:', req.headers);
    const formData = req.files.pdfFile
    // console.log(req.files);
    // console.log(uid);
    // const formData = req.files.pdfFile
    //  console.log(formData.data);
    const fileName = `expenseReport${uid}/${new Date().getTime()}.pdf`
    try
    {
        const fileUrl = await uploadToS3(formData.data, fileName)
        // console.log(fileUrl);
        const downlod = new Downloads(uid, fileUrl)
        await downlod.save()
        res.status(200).json({ fileUrl, msg: "successfully downloaded report" })
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            msg: 'Something Went wrong'
        })
    }
}

exports.getDownloadList = async (req, res) => {
    const uid = req.params.uid
    try
    {

        const list = await Downloads.getAllDownloads(uid)
        if (list)
        {
            res.json({
                data: list[0]
            })
        }
        // console.log(list);
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            msg: 'something went Wrong'
        })
    }
}
const User = require("../models/user");
// const Purchase = require("../models/purchase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");

const AWS = require("aws-sdk");

const myToken = "$moBhi$Love430";

exports.postSignUpUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  // console.log(hashedPassword);
  try {
    const user = new User({name :name, email: email, password :  hashedPassword,purchase : {status : "" , order_id : ""}});

    user
      .save()
      .then(() => {
        res.json({
          msg: "Signup successfull",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          msg: "User Already Exixst",
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};

exports.postLoginUser = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  try {
    const userDetails = await  User.getOverallDetails(email);
    // console.log(userDetails);
    User.findOne({email : email})
      .then(async (data) => {
        console.log(data);
        const result = await bcrypt.compare(password, data.password);
        const authToken = jwt.sign(data.password, myToken);
        if (result) {
          // console.log(userDetails);
          res.json({
            data: userDetails,
            token: authToken,
          });
        } else {
          res.json({
            msg: "Inavalid Credentials",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          msg: "Inavalid Credentials",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

exports.purchasePremium = (req, res) => {
  const id = req.params.id;
  // console.log(process.env.RAZOR_PAY_KEY_ID);
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    const amount = 2500;
    // console.log(rzp);
    rzp.orders.create({ amount: amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Something Went Wrong",
        });
      }
       const mypurchase = { order_id : order.id ,status : "PENDING"}

       User.findByIdAndUpdate(id, {$set : {purchase : mypurchase}},{new : true})
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

exports.successFullPurchase = async (req, res) => {
  const uid = req.body.uid;
  const ord_id = req.body.order_id;
  // console.log(ord_id,uid);
  const updatePurchase = {
    order_id : ord_id,
    status : "SUCCESS"
  }
  try {
    User.findByIdAndUpdate(
      uid,
      {
        $set: {
          ispremiumUser: true,
          purchase: updatePurchase,
        },
      },
      { new: true }, // This option returns the modified document instead of the original one
      
    ).then(()=>{
      res.json({
        msg: "Your Membership upgraded",
      });
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Somthing went wrong",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.find({email:email}).exec();
  console.log(user);
  if (!user) {
    res.status(404).json({
      msg: "Email does not exists",
    });
  } else {
    const authToken = jwt.sign(user[0].email, myToken);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abhishekvvet@gmail.com",
        pass: process.env.M_API_KEY,
      },
    });

    const mailOptions = {
      from: "abhishekvvet@gmail.com",
      to: email,
      subject: "Your Password Reset Link",
      html: `<a href="https://bbexpense.netlify.app/resetPassword/${user[0]._id}/${authToken}">click here</a> to reset your password`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          data: info,
        });
      }
    });
  }
};


exports.resetPassword = async (req, res) => {
  const { uid, pass } = req.body;

  console.log(uid, pass);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  try {
    const result = await User.findByIdAndUpdate(uid,{$set : {password : hashedPassword}},{new:true});
    //    console.log(result);
    if(result){

      res.status(200).json({
        msg: "Your Password is Reset Successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

exports.getOverAllUserDeatails = async (req, res) => {
  const id = req.params.id;
  try {
    const userDetails = await  User.getOverallDetails(email);
     if(userDetails){
      res.json({
        data: userDetails,
      });
     }
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};


/*
exports.getOverAllUserDeatails = (req, res) => {
  const id = req.params.id;
  try {
    User.getOverAllUserDeatails(id)
      .then((data) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

exports.purchasePremium = (req, res) => {
  const id = req.params.id;
  // console.log(process.env.RAZOR_PAY_KEY_ID);
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    const amount = 2500;
    // console.log(rzp);
    rzp.orders.create({ amount: amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Something Went Wrong",
        });
      }

      const purchase = new Purchase(order.id, "PENDING", id);
      purchase
        .save()
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

exports.successFullPurchase = async (req, res) => {
  const uid = req.body.uid;
  const ord_id = req.body.order_id;
  // console.log(ord_id,uid);
  try {
    await Purchase.update("SUCCESS", ord_id, uid);
    await User.updateMemberShip(uid);

    res.json({
      msg: "Your Membership upgraded",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Somthing went wrong",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findUserById(email);
  // console.log(user);
  if (user[0].length === 0) {
    res.status(404).json({
      msg: "Email does not exists",
    });
  } else {
    const authToken = jwt.sign(user[0][0].email, myToken);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abhishekvvet@gmail.com",
        pass: process.env.M_API_KEY,
      },
    });

    const mailOptions = {
      from: "abhishekvvet@gmail.com",
      to: email,
      subject: "Your Password Reset Link",
      html: `<a href="http://localhost:3000/resetPassword/${user[0][0].id}/${authToken}">click here</a> to reset your password`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          data: info,
        });
      }
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { uid, pass } = req.body;

  console.log(uid, pass);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  try {
    const result = await User.resetPassword(hashedPassword, uid);
    //    console.log(result);

    res.status(200).json({
      msg: "Your Password is Reset Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};
*/
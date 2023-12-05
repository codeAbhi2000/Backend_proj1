const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  income: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  savings: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cat_limits: {
    investment: { type: Number ,required : true},
    bills_utilities: { type: Number ,required : true},
    transportation: { type: Number ,required : true},
    shopping: { type: Number ,required : true},
    grocery: { type: Number ,required : true},
    others: { type: Number ,required : true},
  },
  uid : {
    type: Schema.Types.ObjectId,
    required : true,
    ref : "User"
  }
});


module.exports = mongoose.model("Budget",budgetSchema)
/*
module.exports = class Budget{
    constructor(income,budget,savings,date,uid){
        this.income = income;
        this.budget = budget;
        this.savings = savings;
        this.date = date;
        this.uid = uid;
    }

    save(){
        return db.execute('insert into budget (income,budget,savings,date,uid) values(?,?,?,?,?)',
        [this.income,this.budget,this.savings,this.date,this.uid])
    }
}
*/

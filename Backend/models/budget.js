const db = require('../utils/database')

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
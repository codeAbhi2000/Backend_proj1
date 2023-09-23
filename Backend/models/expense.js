const db = require('../utils/database')

module.exports = class Expense{
    constructor(id,description,date,amount,cat_id,uid){
        this.id = id
        this.description = description
        this.date = date
        this.amount = amount
        this.cat_id = cat_id
        this.uid = uid
    }
    save(){

        if(this.id){

        }
        else{
            return db.execute('insert into advance_expense_tracker.expense (description,date,amount,category_id,uid) values(?,?,?,?,?)',
            [this.description,this.date,this.amount,this.cat_id,this.uid])
        }
    }

    static getAllExpenses(id){
        return db.execute('select e.id, e.description,e.date,e.amount,c.id as cat_id, c.name as cat_name from advance_expense_tracker.expense as e ,advance_expense_tracker.categories as c where c.id = e.category_id and e.uid = ?',[id])
    }
}
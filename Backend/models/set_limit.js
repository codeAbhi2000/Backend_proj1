const db = require('../utils/database')

module.exports = class SetLimit{
    constructor(cat_id_limit,date,uid){
        this.cat_id_limit = cat_id_limit
        this.date = date
        this.uid = uid
    }

    save(){
        return db.execute('INSERT INTO set_cat_limit (cat_id_limit,date,uid) VALUES(?,?,?)',
        [this.cat_id_limit,this.date,this.uid])
    }

    static getBudgetLimit(id){
        return db.execute('SELECT * FROM set_cat_limit WHERE uid = ? and  MONTH(date) = MONTH(now())',[id])
    }
}
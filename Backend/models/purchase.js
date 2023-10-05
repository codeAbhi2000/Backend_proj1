const db = require('../utils/database')

module.exports = class Purchase{
    constructor(id,status,uid){
        this.id = id 
        this.status = status 
        this.uid = uid
    }

    save(){
        return db.execute('INSERT INTO purchase (oder_id,status,uid) values(?,?,?)',[this.id,this.status,this.uid])
    }

    static update(status,ord_id,uid){
        // console.log(ord_id);
        db.execute('UPDATE purchase SET status = ? WHERE uid = ?  AND oder_id = ?;',[status,uid,ord_id])
    }
}
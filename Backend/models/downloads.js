const db = require('../utils/database')


module.exports = class Downloads{
    constructor(uid ,link){
        this.uid = uid
        this.link = link
    }

    save(){
        return db.execute('insert into downloads (uid,link) values(?,?)',[this.uid,this.link])
    }
}
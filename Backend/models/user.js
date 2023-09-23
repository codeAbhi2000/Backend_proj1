const db = require('../utils/database')


module.exports = class User{
    constructor(name,email,password){
        this.name =name
        this.email = email
        this.password = password
    }

    save(){
        return db.execute('INSERT INTO user (name,email,password) VALUES(?,?,?)',[this.name,this.email,this.password])
    }

    static findUserById(id){
        return db.execute('SELECT * FROM user WHERE email = ? ',[id])
    }

}
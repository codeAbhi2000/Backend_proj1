const db = require('../utils/database')


module.exports = class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    save() {
        return db.execute('INSERT INTO user (name,email,password) VALUES(?,?,?)', [this.name, this.email, this.password])
    }

    static findUserById(id) {
        return db.execute('SELECT * FROM user WHERE email = ? ', [id])
    }

    static async getOverAllUserDeatails(id) {
        try {
            const queries = [
                {
                  query: ' select u.id,u.name,u.email ,u.ispremiumuser from user u where u.email = ?',
                  values: [id],
                },
                {
                  query: ' select sum(e.amount) as total_expense from user u ,expense e where e.uid = u.id and  MONTH(e.date) = MONTH(now()) and u.email = ?',
                  values: [id],
                },
                {
                  query: ' select b.budget, b.income from budget b,user u  where b.uid = u.id and month(b.date) = month(now()) and u.email = ?',
                  values: [id],
                },
                
              ];
        
              

          const resultsArray = await Promise.all(
            queries.map(async (queryInfo) => {
              const { query, values } = queryInfo;
              const [results] = await db.execute(query, values);
              if (!results) {
                console.log(`No results found for query: ${sql}`);
                return null;
              }
              return results;
            })
          );
      
          return resultsArray.filter((result) => result !== null);
              
        } catch (error) {
            console.log(error);
        }
    }

    static updateMemberShip(id){
      // console.log(id);
      return db.execute('update user set ispremiumuser = ? where id = ?',[true,id])
    }

    static resetPassword(pass,id){
      return db.execute('update user set password = ? where id = ? ',[pass,id])
    }

    static upDateDownload(id,url){
      return db.execute('update user set downloads = ? where id = ?',[url,id])
    }

}

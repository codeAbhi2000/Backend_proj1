const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumUser: {
    type: Boolean,
    default: false,
  },
  purchase: {
    order_id: { type: String },
    status: { type: String },
  },
  downloads: {
    link: { type: String },
  },
});

userSchema.statics.getOverallDetails = async function (id) {
  try {
    const currentMonth = new Date().getMonth() + 1;

    const overallDetails = await this.aggregate([
      { $match: { email: id } },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "uid",
          as: "expenses",
        },
      },
      {
        $lookup: {
          from: "budgets",
          localField: "_id",
          foreignField: "uid",
          as: "budget",
        },
      },
      {
        $project: {
          _id: 0,
          user: {
            id: "$_id",
            name: "$name",
            email: "$email",
            ispremiumuser: "$ispremiumUser",
          },
          totalExpense: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$expenses",
                    cond: {
                      $and: [
                        {
                          $gte: [
                            "$$this.date",
                            new Date(new Date().getFullYear(), currentMonth - 1, 1),
                          ],
                        },
                        {
                          $lt: [
                            "$$this.date",
                            new Date(new Date().getFullYear(), currentMonth, 1),
                          ],
                        },
                      ],
                    },
                  },
                },
                as: "exp",
                in: "$$exp.amount",
              },
            },
          },
          budgets : "$budget",
          budget: {
            $cond: {
              if: {
                $or: [
                  { $isArray: "$budget.budget" },
                  {
                    $gte: [
                      "$budget.date",
                      new Date(new Date().getFullYear(), currentMonth - 1, 1),
                    ],
                  },
                ],
              },
              then: { $ifNull: [{ $sum: "$budget.budget" }, 0] },
              else: 0,
            },
          },
          income: {
            $cond: {
              if: {
                $or: [
                  { $isArray: "$budget.income" },
                  {
                    $gte: [
                      "$budget.date",
                      new Date(new Date().getFullYear(), currentMonth - 1, 1),
                    ],
                  },
                ],
              },
              then: { $ifNull: [{ $sum: "$budget.income" }, 0] },
              else: 0,
            },
          },
        },
      },
    ]);
    
    if (overallDetails.length === 0) {
      console.log("User not found");
      return null;
    }
    
    console.log(JSON.stringify(overallDetails, null, 2));
    
    return overallDetails[0];
    
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for further handling, if needed
  }
};

module.exports = mongoose.model("User", userSchema);

/*
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
*/

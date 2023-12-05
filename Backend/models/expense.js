const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  description: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

expenseSchema.statics.getMonthReport = async function (month, id) {
  try {
    const monthStart = new Date(new Date().getFullYear(), month - 1, 1);
    const monthEnd = new Date(new Date().getFullYear(), month, 1);

    const allExpenses = await this.find({
      uid: mongoose.Types.ObjectId.createFromHexString(id),
      date: { $gte: monthStart, $lt: monthEnd },
    });

    const totalExpense = allExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const result = await this.aggregate([
      {
        $match: {
          uid: mongoose.Types.ObjectId.createFromHexString(id),
          date: { $gte: new Date(new Date().getFullYear(), month - 1, 1) },
        },
      },
      {
        $project: {
          _id: 0,
          allExpenses: "$$ROOT",
          categoryDetails: {
            name: "$category", // Assuming "category" field holds the category name
          },
        },
      },
    ]);

    // Extract the relevant fields from the result

    const categoryExpenses = result.map((item) => ({
      name: item.categoryDetails.name,
      total_expense: item.allExpenses.amount,
    }));

    const totalBudget = await this.aggregate([
      {
        $match: {
          uid: mongoose.Types.ObjectId.createFromHexString(id),
          date: { $gte: monthStart, $lt: monthEnd },
        },
      },
      {
        $lookup: {
          from: "budgets",
          localField: "uid",
          foreignField: "uid",
          as: "budgetDetails",
        },
      },
      {
        $limit: 1, // Limit to one document for total budget calculation
      },
      {
        $project: {
          _id: 0,
          total_budget: {
            $ifNull: [
              {
                $sum: {
                  $cond: [
                    { $isArray: "$budgetDetails.budget" },
                    "$budgetDetails.budget",
                    0,
                  ],
                },
              },
              0,
            ],
          },
          total_savings: {
            $ifNull: [
              {
                $sum: {
                  $cond: [
                    { $isArray: "$budgetDetails.savings" },
                    "$budgetDetails.savings",
                    0,
                  ],
                },
              },
              0,
            ],
          },
          total_income: {
            $ifNull: [
              {
                $sum: {
                  $cond: [
                    { $isArray: "$budgetDetails.income" },
                    "$budgetDetails.income",
                    0,
                  ],
                },
              },
              0,
            ],
          },
        },
      },
    ]);

    return { allExpenses, totalExpense, categoryExpenses, totalBudget };
  } catch (error) {
    console.log(error);
  }
};

expenseSchema.statics.getYearReport = async function (year, id) {
  try {
    const result = await this.aggregate([
      {
        $match: {
          uid: mongoose.Types.ObjectId.createFromHexString(id),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $project: {
          _id: 0,
          allExpenses: "$$ROOT",
          categoryDetails: {
            _id: "$category",
            name: "$category", // Assuming "category" field holds the category name
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$allExpenses.date" } },
          total_expense: { $sum: "$allExpenses.amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    const totalBudget = await this.aggregate([
      {
        $match: {
          uid: mongoose.Types.ObjectId.createFromHexString(id),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $lookup: {
          from: "budgets",
          localField: "uid",
          foreignField: "uid",
          as: "budgetDetails",
        },
      },
      {
        $unwind: "$budgetDetails", // Unwind the budgetDetails array
      },
      {
        $limit: 1, // Limit to one budget document
      },
      {
        $group: {
          _id: { month: { $month: "$budgetDetails.date" } },
          total_budget: { $sum: "$budgetDetails.budget" },
          total_savings: { $sum: "$budgetDetails.savings" },
          total_income: { $sum: "$budgetDetails.income" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    const categoryExpenses = await this.aggregate([
      {
        $match: {
          uid: mongoose.Types.ObjectId.createFromHexString(id),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, category: "$category" },
          total_expense: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          categories: {
            $push: {
              category: "$_id.category",
              total_expense: "$total_expense",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return { result, totalBudget, categoryExpenses };
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("Expense", expenseSchema);
/*
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
            return db.execute('update expense set description = ?, date= ?, amount= ?,category_id=? where id = ? and uid =? ',[this.description,this.date,this.amount,this.cat_id,this.id,this.uid])
        }
        else{
            return db.execute('insert into expense (description,date,amount,category_id,uid) values(?,?,?,?,?)',
            [this.description,this.date,this.amount,this.cat_id,this.uid])
        }
    }

    static getAllExpenses(id){
        return db.execute('select e.id, e.description,e.date,e.amount,c.id as cat_id, c.name as cat_name from expense as e , categories as c where c.id = e.category_id and e.uid = ? order by e.date',[id])
    }

    static getCatExpenses(id){
        return db.execute('SELECT c.id, c.name, SUM(e.amount) AS total_expense FROM categories c LEFT JOIN expense e ON c.id = e.category_id AND e.uid = ? and MONTH(e.date) = MONTH(now())  GROUP BY c.id, c.name ORDER BY c.id',[id])
    }

    static async getMonthReport(month,id){
        try {
            const queries = [
                {
                  query: 'select sum(e.amount) as total_expense from expense e where month(e.date) = ? and e.uid = ?',
                  values: [month, id],
                },
                {
                  query: ' select sum(b.budget) as total_budget ,b.savings from budget b where month(b.date) = ? and b.uid = ?',
                  values: [month, id],
                },
                {
                  query: 'select e.id ,e.description,e.date,e.amount,c.name as cat_name from expense e,categories c   where e.category_id=c.id and month(e.date) = ? and e.uid = ? order by e.date',
                  values: [month, id],
                },
                {
                  query: 'SELECT c.id, c.name, SUM(e.amount) AS total_expense FROM categories c LEFT JOIN expense e ON c.id = e.category_id AND e.uid = ? and MONTH(e.date) = MONTH(now())  GROUP BY c.id, c.name ORDER BY c.id',
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

    static async getYearReport(year,id){
        try {
            const queries = [
                {
                  query: ' select MONTHNAME(e.date) as month,sum(e.amount) as total_expense from expense e where year(e.date) = ?  and  e.uid = ? group by month(e.date) order by month(e.date)',
                  values: [year, id],
                },
                {
                  query: 'select MONTHNAME(b.date) as month,sum(b.budget) as total_budget ,b.savings,b.income from budget b where  year(b.date) = ? and  b.uid = ? group by month(b.date) order by month(b.date)',
                  values: [year, id],
                },
                {
                  query: `
                  SELECT
                      uid,
                      SUM(total_expense) AS y_total_expense,
                      SUM(total_budget) AS y_total_budget,
                      SUM(total_savings) AS y_total_savings,
                      SUM(total_income) AS y_total_income
                  FROM
                      (
                          SELECT
                              uid,
                              SUM(amount) AS total_expense,
                              0 AS total_budget,
                              0 AS total_savings,
                              0 AS total_income
                          FROM
                              expense
                          WHERE
                              uid = ?
                          UNION ALL
                          SELECT
                              uid,
                              0 AS total_expense,
                              SUM(budget) AS total_budget,
                              SUM(savings) AS total_savings,
                              SUM(income) AS total_income
                          FROM
                              budget
                          WHERE
                              uid = ?
                      ) subquery
                  GROUP BY
                      uid;
                `,
                  values: [id,id],
                },
                {
                  query:'SELECT c.id, c.name, SUM(e.amount) AS total_expense FROM categories c LEFT JOIN expense e ON c.id = e.category_id and year(e.date) = ?  AND e.uid = ?  GROUP BY c.id, c.name ORDER BY c.id',
                  values : [year,id]
                }
                
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


    static async getReportGivenRange(start_date,end_date,uid){
        try {
            const queries = [
                {
                  query: ' select e.id ,e.description,e.date,e.amount,c.name as cat_name from expense e,categories c   where e.category_id=c.id and ( date between ? and ?) and e.uid = ? order by e.date',
                  values: [start_date,end_date,uid],
                },
                {
                  query: ' select sum(e.amount) as total_expense from expense e  where( date between ? and ?) and e.uid = ?',
                  values: [start_date,end_date,uid],
                },
                {
                  query: 'select sum(b.budget) as total_budget ,b.savings from budget b where( date between ? and ?) and b.uid = ?',
                  values: [start_date,end_date,uid],
                },
                {
                  query: 'SELECT c.id, c.name, SUM(e.amount) AS total_expense FROM categories c LEFT JOIN expense e ON c.id = e.category_id  and (e.date between ? and ? ) AND e.uid = ?  GROUP BY c.id, c.name ORDER BY c.id',
                  values: [start_date,end_date,uid],
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
}
*/

const jwt = require("jsonwebtoken");

const myToken = "$moBhi$Love430"

const validator = (req, res, next) => {
    const token = req.header('Authorization');
    // console.log(token)
    if (!token)
    {
        res.status(401).send({ error: "Please authenticate using a valid token" })
        console.log("error in token")
    }
    else
    {
        try
        {
            
            const respnse = jwt.verify(token, myToken);
            if(respnse){
                next();
            }
            else{
                res.status(401).send({ error: "token is not verified" })

            }
        } catch (error)
        {
            console.log(error)
            res.status(401).send({ error: "Please authenticate using a valid token" })
            console.log("it is in catch blllock")
        }
    }

}


module.exports = validator;
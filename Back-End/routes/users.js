var express = require('express');
var routerCreateAccount = express.Router();
var routerLoginAccount = express.Router();

const connectionToMySql = require("./mysqlConnector.js");
/* GET users listing. */


module.exports = {
  routerCreateAccount:
  routerCreateAccount.post('/createAccount', function(req, res, next) {
    const {userFirstName,userLastName,userEmail,userMobile,userPassword} = req.body
    var sql = `INSERT INTO users (userEmail,userMobile,userFirstName,userLastName,userPassword) VALUES ('${userEmail}','${userMobile}','${userFirstName}','${userLastName}','${userPassword}')`;
    connectionToMySql.query(sql, function (error, result) {
         if (error) 
         {
             var errorCode = error.code;
             var errorMessage = error.message;
             res.status(400).send({
                 responseMessage:errorMessage,
                 responseCode:0
             })  
         }
         else
         {
             console.log("Craeted new user")
             res.status(200).send({
                 responseMessage:"Account Created",
                 responseCode:1,                 
             })

         }
         
         
         });

  }),
  routerLoginAccount:
  routerLoginAccount.post('/loginAccount', function(req, res, next) {
    const {userEmail,userPassword} = req.body
    connectionToMySql.query(`SELECT * FROM users WHERE userEmail = '${userEmail}' and userPassword='${userPassword}'`, function (err, result) {
           
      if (err)
      { 
          var errorCode = err.code;
          var errorMessage = err.message;
          res.status(400).send({
              responseMessage:errorMessage,
              responseCode:3
          })  
      }
      else
      {
        if(result.length===0)
        {
          res.status(200).send({
            status:"Login Not Successfull",
            response:result
          })
        }
        else
        {
          res.status(200).send({
            status:"Login  Successfull",
            response:result
          })
        }
      }
  
    });
   
  }),
}

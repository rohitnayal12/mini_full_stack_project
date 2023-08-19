const express = require("express");

const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/userModel");



//Registration
userRouter.post("/register", async (req, res) => {
  const { username, email, pass, age } = req.body;

  try {
    

    bcrypt.hash(pass,5,async (err, hash) => {
      if (err) {
        res.send({"msg": err });
      } else {
        const user = new UserModel({ username, email, pass:hash, age });
        await user.save(); //it will save ur data of the user who is registering, in database
        res.status(200).send({ "msg": "New user has been registered successfully" });
      }
    });
  } catch (error) {
    res.status(400).send({"error": error });
  }
});



//Login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user)
     if (user) {

      bcrypt.compare(pass, user.pass, (err,result) => {
        if (result) {
          const token = jwt.sign({ userId:user._id ,user:user.username,}, "masai");
          res.status(200).send({ "msg":"LogIn Successfully", token: token });
        } else {
          res.send({ "error":err});
        }
      });
    } else {
      res.status(200).send({ "msg": "Wrong Credentials."});
    }
  } catch (error) {
    res.status(400).send({ "error": error });
  }

 
});



// //Logout

// userRouter.get("/logout", (req,res)=>{
//   const token=req.headers.authorization.split(" ")[1]
//   try {
//     blacklist.push(token)
//     res.send({"msg":"The user has been Logged out."})
//   } catch (error) {
//     res.send({"error":err})
//   }
// })





module.exports = {
  userRouter,
};

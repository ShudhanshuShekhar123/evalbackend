

const { Router } = require("express")
const userRouter = Router()
const { userModel } = require("../models/usermodal")



userRouter.post("/register", async (req, res) => {
    const { name, password, gender, subscription, age, email } = req.body
    // if (!validatePassword(password)) {
    //   res.send("Invalid password");
    //   return;
    // }
    try {
      // const hashedPassword = await bcrypt.hash(password, 5)
    
        const user = await userModel.create(req.body)
        console.log(user)
        return res.status(200).json(user)
   

        
        
      
    } catch (err) {
      console.log(err.message)
      res.send(err.message)
    }
  })

  userRouter.get("/get", (req,res)=>{
    res.send("user rouute working")
  })

  module.exports = { userRouter }
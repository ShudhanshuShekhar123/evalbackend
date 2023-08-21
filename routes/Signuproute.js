

const { Router } = require("express")
const signuprouter = Router()
const signupmodel = require("../models/signupmodal")
const bcrypt = require("bcrypt")
const token = require("jsonwebtoken")
const apponitmodel = require("../models/appointmentmodal")





signuprouter.post("/signup", async (req, res) => {

  const { email, password, confirm_password } = req.body

  try {

    const hashedpassword = await bcrypt.hash(password, 5)

    const user = await signupmodel.create({ email, password: hashedpassword, confirm_password: hashedpassword })
    res.status(201).send(user)

  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})


signuprouter.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const loginuser = await signupmodel.find({ email })
    // console.log(loginuser)

    if (loginuser) {
      const checkpassowrd = await bcrypt.compare(password, loginuser[0].password)

      console.log(checkpassowrd, "here")
      // const checkconfirmedpassword = bcrypt.compare(confirm_password, loginuser[0].password)
      //  console.log(checkpassowrd)
      if (checkpassowrd) {
        const maketoken = token.sign({user_id: loginuser[0]._id, email: loginuser[0].email}, "masai")
        res.status(200).send({ "msg": "SDign in successfyll", maketoken })
      } else {
        res.send("Wrong Credentials!!")
      }

    } else {
      res.status(404).send("Wrong Email")
    }

  } catch (error) {
    console.log(error)
    res.status(500).send("server Error")
  }

})



signuprouter.get("/getappointments", async (req, res) => {

  // const { email, password, confirm_password } = req.body

  try {

    const user = await apponitmodel.find({})
    res.status(200).send(user)

    
  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})




signuprouter.post("/appointments", async (req, res) => {


  try {
  
    const {name,image ,specialization, experience, location, date, slots, fee} = req.body

    let formatteddate = new Date()
    let year = formatteddate.getFullYear()
    let month = formatteddate.getMonth()
    let todaydate = formatteddate.getDate()
     let currentdate = `${year}-${month}-${todaydate}`

   
   const appointmentdetails = await apponitmodel.create({name, image, specialization, experience, location,date :currentdate , slots, fee})
    res.status(201).send(appointmentdetails)

  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})

signuprouter.get("/appointments/search", async (req, res) => {


  try {
  
      if(req.query.name){
        let findname = await apponitmodel.find({"name": req.query.name})
        res.send(findname)
      }else if (req.query.specialization){
        let findspecialization = await apponitmodel.find({"specialization": req.query.specialization})
        res.send(findspecialization)
      }
   
   

  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})




signuprouter.delete("/appointments/delete/:id", async (req, res) => {


  try {
  
   
        let deleteid = await apponitmodel.findByIdAndDelete({"_id": req.params.id})
          console.log(deleteid)
        res.status(200).send("Deleted Successfully")
      
   
   

  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})


signuprouter.patch("/appointments/update/:id", async (req, res) => {


  try {
    const {name,image ,specialization, experience, location, date, slots, fee} = req.body

    let formatteddate = new Date()
    let year = formatteddate.getFullYear()
    let month = formatteddate.getMonth()
    let todaydate = formatteddate.getDate()
     let currentdate = `${year}-${month}-${todaydate}`
  
   
   
        let updateitem = await apponitmodel.updateOne({_id: req.params.id}, {name, image, specialization, experience, location,date :currentdate , slots, fee})
          console.log(updateitem)
        res.status(200).send("Updated Successfully")
      
   
   

  } catch (error) {
    console.log(error)
    res.status(500).send("servererror")
  }

})










module.exports = { signuprouter }
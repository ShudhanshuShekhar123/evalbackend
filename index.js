const express = require("express")
const app = express()
const mongoose=require("mongoose")
require("dotenv").config()
const { userRouter } = require("./routes/userroutes")
const cors = require("cors")


app.use(express.json())
app.use(cors({ origin:"*"}))


app.use("/user", userRouter)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongodb Atlas")
    } catch (error) {
        console.log("server error")
    }

}




app.get('/', (req, res) => {
    res.send('Welcome to the Homepage !')
});







app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connect()
});



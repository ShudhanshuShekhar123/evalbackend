const express = require("express")
const app = express()
const mongoose=require("mongoose")
require("dotenv").config()
const { signuprouter } = require("./routes/Signuproute")
const cors = require("cors")


app.use(express.json())
app.use(cors({ origin:"*"}))


app.use("/masaihospital", signuprouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage !')
});


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongodb Atlas")
    } catch (error) {
        console.log("server error")
    }

}











app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connect()
});



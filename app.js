const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors")
const classrouter = require("./routers/classes")
const studentrouter = require("./routers/students")

const app = express()
app.use(bodyparser.json())
app.use(cors())

const port = process.env.PORT || 3000
app.use("/",classrouter)
// require("./routers/classes")
app.use("/",studentrouter)
// mongoose.connect(`mongodb://${process.env.DB_DATABASE}`).then(()=>{console.log("connected to database")}).catch(err=>{err.message})
mongoose.connect("mongodb+srv://root:root@cluster0.0yxx9y4.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("connected to database")}).catch(err =>{console.log(err.message)})
app.get("/",(req,res)=> {
res.send("ok")
})

app.listen(port , ()=> {console.log(`Server is running at ${port}`)})
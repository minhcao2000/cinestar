const express = require('express');
const app = express()
const db = require('./services/connectDB')
const cors = require('cors')
require("dotenv").config()

const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movie")
const orderRoutes = require('./routes/order')
const seatRoutes = require("./routes/seat")
const ticketRoutes = require("./routes/ticket")

// connect database
db.connect()

// middleware usage
// parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes)
app.use("/movie", movieRoutes)
app.use("/order", orderRoutes)
app.use("/ticket", ticketRoutes)
app.use("/seat", seatRoutes)

//
app.listen(process.env.PORT, () => {
    console.log(`Server run at port ${process.env.PORT}`)
})
require("dotenv").config()
const express = require('express')
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const expenseRoutes = require('./routes/expense')
const cors = require("cors")
const { middleware } = require("./middleware/authMiddleware")

const app = express()

// middleware
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000
const URI = process.env.ATLAS_URI

mongoose.connect(URI)
const connection = mongoose.connection
connection.once("open", () => {
    console.log("Successfully connected to mongodb database")
})

// routes

app.use("/api/users", authRoutes)
app.use(middleware)
app.use("/api/expenses", expenseRoutes)

app.listen(port, () => {
    console.log("Server running on port " + port)
})
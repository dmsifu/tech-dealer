const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const connectDB = require('./config/db')
const scrapeTodaysData = require('./scheduled jobs/getTodaysData')

connectDB()

const app = express()

scrapeTodaysData()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/deals', require('./routes/routes'))

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})
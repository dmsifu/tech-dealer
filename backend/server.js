const path = require('path')
const express = require('express')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require("cors")
const dotenv = require('dotenv').config()
const scrapeTodaysData = require('./scheduled jobs/getTodaysData')

//middleware
const corsOptions = {
    origin: "https://tech-dealer.onrender.com/"
}

connectDB()

const app = express()
app.use(cors(corsOptions))

//scrapeTodaysData()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/deals', require('./routes/routes'))

// //serve frontend
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// }
// else{
//     app.get('/', (req,res) => res.send('Please set to production'))
// }

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})
const ps5Prices = require('../models/ps5Prices')

//@desc     get todays prices
//@route    GET /api/todaysPrices
//@acess    Private
const getTodaysPrices = async (req, res) => {
    try{
        const data = await ps5Prices.find()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

module.exports = getTodaysPrices
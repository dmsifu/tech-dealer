const techDeals = require('../models/techDeals')

//@desc     get todays prices
//@route    GET /api/todaysPrices
//@acess    Private
const getTodaysOffers = async (req, res) => {
    try{
        const data = await techDeals.find()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

module.exports = getTodaysOffers
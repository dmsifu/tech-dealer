const techDeals = require('../models/techDeals')

//@desc     get todays prices
//@route    GET /api/todaysPrices
//@acess    Private
const getTodaysOffers = async (req, res) => {
    try{
        const deals = await techDeals.find()
        res.status(200).json(deals)
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

module.exports = getTodaysOffers
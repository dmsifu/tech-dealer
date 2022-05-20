const techDeals = require('../models/techDeals')

//@desc     get todays prices
//@route    GET /api/todaysPrices
//@acess    Private
const getTodaysOffers = async (req, res) => {
    try{
        const deals = await techDeals.findById('6285462611f14ac297de8853')
        res.status(200).json(deals)
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

module.exports = getTodaysOffers
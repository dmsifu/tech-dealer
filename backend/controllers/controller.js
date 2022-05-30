const techDeals = require('../models/techDeals')

//@desc     get all of todays deals
//@route    GET /api/allDeals
//@acess    Private
const getAllDeals = async (req, res) => {
    try{
        const deals = await techDeals.findById('62884208a91fad74a652b810')
        res.status(200).json(deals)
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

//@desc     get todays best deals
//@route    GET /api/bestDeals
//@acess    Private
const getBestDeals = async (req, res) => {
    try{
        const bestDeals = await techDeals
        .find({_id: '62884208a91fad74a652b810'})
        .slice('tvs',8)
        .slice('laptops',8)
        .slice('graphicsCards',8)
        .slice('audio',8)
    
        res.status(200).json(bestDeals[0])
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

//@desc     get filtered deals
//@route    GET /api/deals
//@acess    Private
const getFilteredDeals = async (req, res) => {
    try{
        const category = req.query.category
        const page = req.query.page
        const limit = req.query.limit 
        
        const start = (page - 1) * limit
        const end = page * limit

        const deals = await techDeals
            .find({_id: '62884208a91fad74a652b810'},`${category}`)

        const totalPages = Math.ceil(deals[0][`${category}`].length / limit)
        
        res.status(200).json({
            totalPages: totalPages,
            deals: deals[0][`${category}`].slice(parseInt(start),parseInt(end))
        })
    }
    catch(err){
        res.status(400).json({err}) 
    }
}

module.exports = {
    getAllDeals,
    getBestDeals,
    getFilteredDeals
}
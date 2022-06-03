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

//@desc     get deals based on if there is a search or filter
//@route    GET /api/deals
//@acess    Private
const getFilteredDeals = async (req, res) => {
    try{
        const category = req.query.category
        const page = req.query.page
        const limit = req.query.limit 
        const search = req.query.search
        const filter = req.query.filter
        
        const start = (page - 1) * limit
        const end = page * limit        

        const deals = await techDeals.find({_id: '62884208a91fad74a652b810'}, `${category}`)

        if(search !== 'null'){
            const filteredDeals = deals[0][`${category}`].filter( (deal) => 
                deal.title.toLowerCase().includes(`${search.toLowerCase()}`) || deal.soldOn.toLowerCase().includes(`${search.toLowerCase()}`)
                )
            if(filter !== 'null'){
                if(filter === 'descending'){
                    const filteredDeals2 = filteredDeals.sort((a,b)=> parseInt(b['offerPrice'].match(/[\d.]+/g).join('')) - parseInt(a['offerPrice'].match(/[\d.]+/g).join('')))
                    const totalPages = Math.ceil(filteredDeals2.length / limit)
                    res.status(200).json({
                        totalPages: totalPages,
                        deals: filteredDeals2.slice(parseInt(start),parseInt(end))
                    })
                }
                else{
                    const filteredDeals2 = filteredDeals.sort((a,b)=> parseInt(a['offerPrice'].match(/[\d.]+/g).join('')) - parseInt(b['offerPrice'].match(/[\d.]+/g).join('')))   
                    const totalPages = Math.ceil(filteredDeals2.length / limit)  
                    res.status(200).json({
                        totalPages: totalPages,
                        deals: filteredDeals2.slice(parseInt(start),parseInt(end))
                    })           
                }
            }
            else{
                const totalPages = Math.ceil(filteredDeals.length / limit)
    
                res.status(200).json({
                    totalPages: totalPages,
                    deals: filteredDeals.slice(parseInt(start),parseInt(end))
                })
            }
        }
        else if(filter !== 'null' && search === 'null'){
            
            if(filter === 'descending'){
                const filteredDeals = deals[0][`${category}`].sort((a,b)=> parseInt(b['offerPrice'].match(/[\d.]+/g).join('')) - parseInt(a['offerPrice'].match(/[\d.]+/g).join('')))
                const totalPages = Math.ceil(filteredDeals.length / limit)
                res.status(200).json({
                    totalPages: totalPages,
                    deals: filteredDeals.slice(parseInt(start),parseInt(end))
                })
            }
            else{
                const filteredDeals = deals[0][`${category}`].sort((a,b)=> parseInt(a['offerPrice'].match(/[\d.]+/g).join('')) - parseInt(b['offerPrice'].match(/[\d.]+/g).join('')))   
                const totalPages = Math.ceil(filteredDeals.length / limit)  
                res.status(200).json({
                    totalPages: totalPages,
                    deals: filteredDeals.slice(parseInt(start),parseInt(end))
                })           
            }
            
        }
        else if(search === 'null' && filter === 'null'){
            const totalPages = Math.ceil(deals[0][`${category}`].length / limit)
            res.status(200).json({
                totalPages: totalPages,
                deals: deals[0][`${category}`].slice(parseInt(start),parseInt(end))
            })
        }
    }
    catch(error){
        res.status(400).json({message: error}) 
    }
}

module.exports = {
    getAllDeals,
    getBestDeals,
    getFilteredDeals
}